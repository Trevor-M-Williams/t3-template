"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { userProducts } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getUserData } from "./users";

export async function addUserProduct(stripeID: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userData = await getUserData();

  if (!userData) {
    throw new Error("User not found");
  }

  const product = await db.query.products.findFirst({
    where: (product) => eq(product.stripeID, stripeID),
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db
    .insert(userProducts)
    .values({ userID: userData.id, productID: product.id });
}

export async function addUserProductFromStripe(
  userID: number,
  stripeID: string,
) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.stripeID, stripeID),
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.insert(userProducts).values({ userID, productID: product.id });
}

export async function getAllProducts() {
  const res = await db.query.products.findMany();

  const data = await Promise.all(
    res.map(async (product) => {
      const imageUrl = await getImageUrl(product.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl,
      };
    }),
  );

  return data;
}

export async function getUserProducts() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userData = await getUserData();

  if (!userData) {
    throw new Error("User not found");
  }

  const userProducts = await db.query.userProducts.findMany({
    where: (userProduct) => eq(userProduct.userID, userData.id),
  });

  async function getProduct(productId: number) {
    return await db.query.products.findFirst({
      where: (product) => eq(product.id, productId),
    });
  }

  const data = await Promise.all(
    userProducts.map(async (userProduct) => {
      const product = await getProduct(userProduct.productID);
      if (!product) {
        return null;
      }
      const imageUrl = await getImageUrl(product.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl,
      };
    }),
  );

  return data.filter(isNotNull);
}

export async function getStripeUrl(category: string) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.name, category),
  });

  return product ? product.stripeUrl : "";
}

async function getImageUrl(productId: number) {
  const image = await db.query.images.findFirst({
    where: (image) =>
      and(eq(image.product, productId), eq(image.watermark, false)),
  });

  return image ? image.url : "";
}

function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
