"use server";

import { db } from "@/server/db";
import { products, images } from "@/server/db/schema";
import { list } from "@vercel/blob";

export async function addProducts() {
  const data = [
    {
      name: "Billboards",
      stripeID: "price_1PEgPJ2LIacxZrjTXGgprxrt",
      stripeUrl: "https://buy.stripe.com/test_eVa3dY2t5gLz5yM8wO",
      price: 1000,
    },
    {
      name: "Books",
      stripeID: "price_1PEgQS2LIacxZrjTo3z53EqF",
      stripeUrl: "https://buy.stripe.com/test_3csg0K4Bdcvjf9mcN3",
      price: 1000,
    },
    {
      name: "Brochures",
      stripeID: "price_1PEgR32LIacxZrjTlGi411B9",
      stripeUrl: "https://buy.stripe.com/test_00g6qa3x9cvj9P2aEU",
      price: 1000,
    },
    {
      name: "Business Cards",
      stripeID: "price_1PEgRN2LIacxZrjTtwnsEsGM",
      stripeUrl: "https://buy.stripe.com/test_14k6qad7JeDr4uI7sH",
      price: 1000,
    },
    {
      name: "Busses",
      stripeID: "price_1PEgRg2LIacxZrjTznLdsisP",
      stripeUrl: "https://buy.stripe.com/test_aEU4i20kX52R1iw3cq",
      price: 1000,
    },
    {
      name: "Coasters",
      stripeID: "price_1PEgS12LIacxZrjTETzbVQV2",
      stripeUrl: "https://buy.stripe.com/test_7sI7uegjVdzn4uIdR3",
      price: 1000,
    },
    {
      name: "Coolers",
      stripeID: "price_1PEgSJ2LIacxZrjTzqVtpKK8",
      stripeUrl: "https://buy.stripe.com/test_fZeeWGgjVfHv3qE14g",
      price: 1000,
    },
    {
      name: "Cups",
      stripeID: "price_1PEgSZ2LIacxZrjT8QcwZsgP",
      stripeUrl: "https://buy.stripe.com/test_5kAeWG0kXgLzaT6eV5",
      price: 1000,
    },
    {
      name: "Hats",
      stripeID: "price_1PEgSr2LIacxZrjT4wRLERta",
      stripeUrl: "https://buy.stripe.com/test_14k01M0kX0MB1iw00a",
      price: 1000,
    },
    {
      name: "Hoodies",
      stripeID: "price_1PEgTI2LIacxZrjT5hunbeCS",
      stripeUrl: "https://buy.stripe.com/test_9AQ29U0kX0MB6CQeV3",
      price: 1000,
    },
    {
      name: "Mugs",
      stripeID: "price_1PEgUM2LIacxZrjT7vkxjF4F",
      stripeUrl: "https://buy.stripe.com/test_4gw5m61p10MBgdqdQY",
      price: 1000,
    },
    {
      name: "Polos",
      stripeID: "price_1PEgB22LIacxZrjTUL66fJQ4",
      stripeUrl: "https://buy.stripe.com/test_00gdSC1p1cvj3qE00j",
      price: 1000,
    },
    {
      name: "Posters",
      stripeID: "price_1PEgVF2LIacxZrjTikDM9xBN",
      stripeUrl: "https://buy.stripe.com/test_cN215Q4Bd7aZ2mAbIP",
      price: 1000,
    },
    {
      name: "Quarter Zips",
      stripeID: "price_1PEgW82LIacxZrjTt0sqMO7Y",
      stripeUrl: "https://buy.stripe.com/test_aEU3dY7Np2UJ0eseV0",
      price: 1000,
    },
    {
      name: "Signs",
      stripeID: "price_1PEgWT2LIacxZrjTyIJBCp5D",
      stripeUrl: "https://buy.stripe.com/test_dR6cOyc3FbrfbXa9AF",
      price: 1000,
    },
    {
      name: "Store Fronts",
      stripeID: "price_1PEgWl2LIacxZrjTiU7EWWQA",
      stripeUrl: "https://buy.stripe.com/test_9AQ4i22t50MB3qE7sw",
      price: 1000,
    },
    {
      name: "T Shirts",
      stripeID: "price_1PEgX12LIacxZrjTNFIgpFVg",
      stripeUrl: "https://buy.stripe.com/test_8wM3dY0kX0MB6CQ8wx",
      price: 1000,
    },
    {
      name: "Technology",
      stripeID: "price_1PEgXJ2LIacxZrjTNFPb2D6b",
      stripeUrl: "https://buy.stripe.com/test_bIY9Cm9Vx7aZ3qE6or",
      price: 1000,
    },
    {
      name: "Tumblers",
      stripeID: "price_1PEgXY2LIacxZrjT8O3pkO3b",
      stripeUrl: "https://buy.stripe.com/test_28o01MgjVfHvd1ecMO",
      price: 1000,
    },
  ];
  await db.insert(products).values(data);
}

export async function uploadImages() {
  const idMap = {
    billboard: 1,
    book: 2,
    brochure: 3,
    card: 4,
    "bus-": 5,
    coaster: 6,
    cooler: 7,
    cup: 8,
    cap: 9,
    hat: 9,
    hoodie: 10,
    mug: 11,
    polo: 12,
    poster: 13,
    quarter: 14,
    sign: 15,
    storefront: 16,
    tshirt: 17,
    computer: 18,
    desktop: 18,
    devices: 18,
    imac: 18,
    ipad: 18,
    phone: 18,
    hydroflask: 19,
    tumbler: 19,
  };

  const { blobs } = await list();
  const data = blobs
    .map((blob) => {
      const watermark = blob.pathname.toLowerCase().includes("watermark");

      const product = Object.keys(idMap).find((key) => {
        return blob.pathname.toLowerCase().includes(key);
      });

      if (!product) {
        console.log("No product found for", blob.pathname);
        return null;
      }

      const productId = idMap[product as keyof typeof idMap];

      return {
        pathname: blob.pathname,
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        size: blob.size,
        watermark,
        product: productId,
      };
    })
    .filter(Boolean);

  //   console.log(data);
  await db.insert(images).values(data);
  console.log("Images uploaded");
}
