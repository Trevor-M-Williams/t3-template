import Cors from "micro-cors";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
      //   const email = event.data.object.customer_details.email;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        },
      );
      const lineItems = sessionWithLineItems.line_items;
      console.log(lineItems.data[0]);
      const priceID = lineItems.data[0].price.id;

      if (!priceID) {
        return NextResponse.json({
          message: "No product ID found",
          status: 400,
        });
      }

      // get user id from email
      // add row to user_products table
      // revalidatePath?

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
