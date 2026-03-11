import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  addCommunicationLog,
  getCommunicationLogs,
} from "./db";

/**
 * Template: Admin Router
 * Add this router to your server/routers.ts file as:
 * admin: adminRouter,
 * 
 * All procedures require admin role and are protected.
 */

export const adminRouter = router({
  /**
   * List all submissions with optional filtering
   * Returns all contact submissions ordered by newest first
   */
  submissions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
    return await getAllSubmissions();
  }),

  /**
   * Get a single submission by ID
   * Returns full submission details including contact info and message
   */
  getSubmission: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return await getSubmissionById(input.id);
    }),

  /**
   * Update submission status and optional admin notes
   * Status values: "new" | "contacted" | "qualified" | "negotiating" | "converted" | "rejected"
   */
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

  /**
   * Add a communication log entry
   * Types: "email" | "call" | "meeting" | "note"
   * Creates audit trail of all interactions with leads
   */
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

  /**
   * Get communication history for a submission
   * Returns all communication logs ordered by newest first
   */
  getCommunicationHistory: protectedProcedure
    .input(z.object({ submissionId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return await getCommunicationLogs(input.submissionId);
    }),
});
