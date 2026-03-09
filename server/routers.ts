import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission, getAllSubmissions, getSubmissionById, updateSubmissionStatus, addCommunicationLog, getCommunicationLogs } from "./db";
import { notifyOwner } from "./_core/notification";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          company: z.string().optional(),
          inquiryType: z.enum(["investor", "partnership", "media"]),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Save to database
          await createContactSubmission(input);

          // Send email notification to owner
          const inquiryTypeLabel = {
            investor: "Investor Inquiry",
            partnership: "Partnership Request",
            media: "Media Inquiry",
          }[input.inquiryType];

          const emailContent = `New Contact Form Submission\n\nInquiry Type: ${inquiryTypeLabel}\nName: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || "Not provided"}\nCompany: ${input.company || "Not provided"}\n\nMessage:\n${input.message}`;

          await notifyOwner({
            title: `New ${inquiryTypeLabel} from ${input.name}`,
            content: emailContent,
          });

          return {
            success: true,
            message: "Thank you for your inquiry! We will be in touch shortly.",
          };
        } catch (error) {
          console.error("[Contact] Submission failed:", error);
          throw error;
        }
      }),
  }),

  admin: router({
    submissions: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        return await getAllSubmissions();
      }),

    getSubmission: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        return await getSubmissionById(input.id);
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "contacted", "qualified", "negotiating", "converted", "rejected"]),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        await updateSubmissionStatus(input.id, input.status, input.notes);
        return { success: true };
      }),

    addNote: protectedProcedure
      .input(
        z.object({
          submissionId: z.number(),
          type: z.enum(["email", "call", "meeting", "note"]),
          content: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        await addCommunicationLog(input);
        return { success: true };
      }),

    getCommunicationHistory: protectedProcedure
      .input(z.object({ submissionId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        return await getCommunicationLogs(input.submissionId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
