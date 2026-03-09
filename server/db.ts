import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contactSubmissions, InsertContactSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact submission: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(contactSubmissions).values(submission);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    throw error;
  }
}

import { desc } from "drizzle-orm";
import { communicationLog, InsertCommunicationLog } from "../drizzle/schema";

export async function getAllSubmissions() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submissions: database not available");
    return [];
  }

  try {
    const result = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
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
    const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get submission:", error);
    throw error;
  }
}

export async function updateSubmissionStatus(id: number, status: string, notes?: string) {
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
    await db.update(contactSubmissions).set(updateData).where(eq(contactSubmissions.id, id));
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
    const result = await db.select().from(communicationLog).where(eq(communicationLog.submissionId, submissionId)).orderBy(desc(communicationLog.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get communication logs:", error);
    throw error;
  }
}
