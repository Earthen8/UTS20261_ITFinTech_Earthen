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
    invoiceUrl: string;
}

/**
 * Single integration point for "Confirm & Pay".
 */
export async function createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create payment');
    }

    return res.json();
}