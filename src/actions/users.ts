"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
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
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User not found");
    }

    await db.insert(users).values({ clerkID: userId, email });

    return await db.query.users.findFirst({
      where: (user) => eq(user.clerkID, userId),
    });
  }

  return userData;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (user) => eq(user.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
