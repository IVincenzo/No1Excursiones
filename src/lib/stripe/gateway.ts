import "server-only";
import Stripe from "stripe";
import type { CheckoutRequest, CheckoutResult, PaymentGateway } from "./types";

export class MockPaymentGateway implements PaymentGateway {
  async createCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
    return {
      externalId: `mock_${input.bookingReference}`,
      url: null,
      mode: "mock",
    };
  }
}

export class StripePaymentGateway implements PaymentGateway {
  private readonly stripe: Stripe;
  constructor(secret = process.env.STRIPE_SECRET_KEY) {
    if (!secret)
      throw new Error("STRIPE_SECRET_KEY is required when PAYMENT_MODE=stripe");
    this.stripe = new Stripe(secret);
  }
  async createCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
    const session = await this.stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: input.customerEmail,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: input.currency.toLowerCase(),
              unit_amount: input.amountMinor,
              product_data: {
                name: `No1 Excursiones booking ${input.bookingReference}`,
              },
            },
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        metadata: { bookingReference: input.bookingReference },
      },
      { idempotencyKey: `checkout:${input.bookingReference}` },
    );
    return { externalId: session.id, url: session.url, mode: "stripe" };
  }
}

export function getPaymentGateway(): PaymentGateway {
  return process.env.PAYMENT_MODE === "stripe"
    ? new StripePaymentGateway()
    : new MockPaymentGateway();
}
