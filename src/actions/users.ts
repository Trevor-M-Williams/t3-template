"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserData() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userData = await db.query.users.findFirst({
    where: (user) => eq(user.clerkID, userId),
  });

  if (!userData) {
    await createUser(userId);
    return await db.query.users.findFirst({
      where: (user) => eq(user.clerkID, userId),
    });
  }

  return userData;
}

export async function createUser(clerkID: string) {
  return await db.insert(users).values({ clerkID });
}
