import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !webhookSecret || !signature)
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 503 },
    );
  const stripe = new Stripe(secret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  const payload = await getPayload({ config });
  const previous = await payload.find({
    collection: "processed-webhook-events",
    where: { externalEventId: { equals: event.id } },
    limit: 1,
  });
  if (previous.totalDocs > 0)
    return NextResponse.json({ received: true, duplicate: true });
  await payload.create({
    collection: "processed-webhook-events",
    data: {
      externalEventId: event.id,
      provider: "stripe",
      processedAt: new Date().toISOString(),
    },
  });
  // A verified payment is deliberately not enough to fabricate a provider confirmation.
  // Fulfilment will move its booking through paid_pending_confirmation to confirmed or manual_review.
  payload.logger.info(
    { eventId: event.id, eventType: event.type },
    "Verified Stripe webhook received",
  );
  return NextResponse.json({ received: true });
}
