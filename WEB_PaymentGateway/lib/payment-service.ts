import type { Totals } from './pricing';

export type PaymentMethod = 'card' | 'paypal' | 'other';

export interface ShippingAddress {
    fullName: string;
    address: string;
    phone: string;
}

export interface PaymentRequest {
    shipping: ShippingAddress;
    method: PaymentMethod;
    items: { productId: string; name: string; price: number; quantity: number }[];
    totals: Totals;
    shippingFee: number;
    grandTotal: number;
}

export interface PaymentResponse {
    reference: string;
}

/**
 * Single integration point for "Confirm & Pay".
 *
 * TODO (next tasks): replace this stub with a POST to your API route
 * (e.g. /api/payment/create) that saves Checkout/Payment in MongoDB and
 * creates a Xendit invoice, then redirect to the returned invoice URL.
 */
export async function createPayment(_request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { reference: `ORD-${Date.now().toString(36).toUpperCase()}` };
}