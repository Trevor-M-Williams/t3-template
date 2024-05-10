"use server";

import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";

export async function getCategoryImages(category: string) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.name, category),
  });

  if (!product) return [];

  const images = await db.query.images.findMany({
    where: (image) =>
      and(eq(image.product, product.id), eq(image.watermark, false)),
  });

  return images;
}

export async function getWatermarkedCategoryImages(category: string) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.name, category),
  });

  if (!product) return [];

  const images = await db.query.images.findMany({
    where: (image) =>
      and(eq(image.product, product.id), eq(image.watermark, true)),
  });

  return images;
}

export async function getProductImages(stripeID: string) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.stripeID, stripeID),
  });

  if (!product) return [];

  const images = await db.query.images.findMany({
    where: (image) =>
      and(eq(image.product, product.id), eq(image.watermark, false)),
  });

  return images;
}
