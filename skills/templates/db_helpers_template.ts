import { eq, desc } from "drizzle-orm";
import { contactSubmissions, communicationLog, InsertCommunicationLog } from "../drizzle/schema";

/**
 * Template: Database Helper Functions
 * Add these functions to your server/db.ts file.
 * Customize table names and fields based on your schema.
 */

export async function getAllSubmissions() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submissions: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get submissions:", error);
    throw error;
  }
}

export async function getSubmissionById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submission: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get submission:", error);
    throw error;
  }
}

export async function updateSubmissionStatus(
  id: number,
  status: string,
  notes?: string
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update submission: database not available");
    throw new Error("Database not available");
  }

  try {
    const updateData: any = {
      status,
      lastContactedAt: new Date(),
    };
    if (notes !== undefined) {
      updateData.adminNotes = notes;
    }
    await db
      .update(contactSubmissions)
      .set(updateData)
      .where(eq(contactSubmissions.id, id));
  } catch (error) {
    console.error("[Database] Failed to update submission:", error);
    throw error;
  }
}

export async function addCommunicationLog(log: InsertCommunicationLog) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add communication log: database not available");
    throw new Error("Database not available");
  }

  try {
    await db.insert(communicationLog).values(log);
  } catch (error) {
    console.error("[Database] Failed to add communication log:", error);
    throw error;
  }
}

export async function getCommunicationLogs(submissionId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get communication logs: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(communicationLog)
      .where(eq(communicationLog.submissionId, submissionId))
      .orderBy(desc(communicationLog.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get communication logs:", error);
    throw error;
  }
}
