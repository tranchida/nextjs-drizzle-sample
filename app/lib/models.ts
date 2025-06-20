import db from "./client";
import { users } from "../db/schema";
import { asc, eq } from "drizzle-orm";

export async function getUsers() {
    return await db.select().from(users).orderBy(asc(users.lastname), asc(users.firstname)).limit(100);
}

export async function getUser(id: number) {
    return await db.select().from(users).where(eq(users.id, id));
}


export async function getManagers() {
    return await db.select().from(users).where(eq(users.employed, "Manager")).orderBy(asc(users.lastname), asc(users.firstname));
}

export async function getDevelopers() {
    return await db.select().from(users).where(eq(users.employed, "Developer")).orderBy(asc(users.lastname), asc(users.firstname));
} 

export async function switchUserActiveStatus(id: number): Promise<void> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (user.length === 0) {
      throw new Error("User not found");
    }
    await db
      .update(users)
      .set({ active: !user[0].active, updatedAt: new Date() })
      .where(eq(users.id, id));
  
  }
  