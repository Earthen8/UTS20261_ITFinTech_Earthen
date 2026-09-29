export const TAX_RATE = 0.11; // PPN 11%
export const SHIPPING_FEE = 15000; // flat, IDR

export interface Totals {
    subtotal: number;
    tax: number;
    total: number;
}

/** Subtotal + tax, as shown on the Checkout page. */
export function calculateTotals(subtotal: number): Totals {
    const tax = Math.round(subtotal * TAX_RATE);
    return { subtotal, tax, total: subtotal + tax };
}

export function getShippingFee(subtotal: number): number {
    return subtotal > 0 ? SHIPPING_FEE : 0;
}