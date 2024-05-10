import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/server/db";
import { userProducts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({
      message: "Stripe is not initialized",
      status: 500,
    });
  }

  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const email = event.data.object.customer_details.email;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        },
      );
      const lineItems = sessionWithLineItems.line_items;
      const priceID = lineItems.data[0].price.id;

      if (!priceID) {
        return NextResponse.json({
          message: "No product ID found",
          status: 400,
        });
      }

      const user = await getUserByEmail(email);
      await addUserProduct(user.id, priceID);

      return NextResponse.json({ result: event, status: 200 });
    }

    return NextResponse.json({ result: event, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "An error occurred",
      status: 500,
    });
  }
}

async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (user) => eq(user.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

async function addUserProduct(userID: number, priceID: string) {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.stripeID, priceID),
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.insert(userProducts).values({ userID, productID: product.id });
}
