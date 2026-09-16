export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "partially_refunded"
  | "refunded";
export interface CheckoutRequest {
  bookingReference: string;
  amountMinor: number;
  currency: "EUR";
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}
export interface CheckoutResult {
  externalId: string;
  url: string | null;
  mode: "mock" | "stripe";
}
export interface PaymentGateway {
  createCheckout(input: CheckoutRequest): Promise<CheckoutResult>;
}
