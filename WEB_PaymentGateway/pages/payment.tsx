import Head from 'next/head';
import { FormEvent, useState } from 'react';
import MobileFrame from '../components/layout/MobileFrame';
import BackHeader from '../components/layout/BackHeader';
import EmptyCart from '../components/ui/EmptyCart';
import PriceRow from '../components/ui/PriceRow';
import { LockIcon } from '../components/ui/Icons';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/format';
import { calculateTotals, getShippingFee } from '../lib/pricing';
import {
  createPayment,
  type PaymentMethod,
  type ShippingAddress,
} from '../lib/payment-service';

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: string; desc: string }[] = [
  { value: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, JCB' },
  { value: 'paypal', label: 'PayPal', icon: '🅿️', desc: 'Pay with your PayPal account' },
  { value: 'other', label: 'E-Wallet / Transfer', icon: '📱', desc: 'GoPay, OVO, Bank Transfer' },
];

type FieldErrors = Partial<Record<keyof ShippingAddress, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

function validate(values: ShippingAddress): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!values.address.trim()) errors.address = 'Address is required.';
  if (!/^\+?[0-9][0-9\s-]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number (8–16 digits).';
  }
  return errors;
}

export default function PaymentPage() {
  const { ready, lines, subtotal, clear } = useCart();

  const [shipping, setShipping] = useState<ShippingAddress>({ fullName: '', address: '', phone: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState('');

  const totals = calculateTotals(subtotal);
  const shippingFee = getShippingFee(subtotal);
  const grandTotal = totals.total + shippingFee;
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || status === 'success' || lines.length === 0) return;

    const fieldErrors = validate(shipping);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    try {
      const result = await createPayment({
        shipping: {
          fullName: shipping.fullName.trim(),
          address: shipping.address.trim(),
          phone: shipping.phone.trim(),
        },
        method,
        items: lines.map(({ product, quantity }) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
        })),
        totals,
        shippingFee,
        grandTotal,
      });
      setReference(result.reference);
      setStatus('success');
      clear();
      if (result.invoiceUrl) {
        window.location.assign(result.invoiceUrl);
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-[#f0ebe4]/40 px-3.5 py-2.5 text-sm text-[#2e261c] placeholder-[#a0937f] outline-none transition focus:bg-white focus:ring-2 ${hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-[#e4ddd3] focus:border-[#2d6a4f] focus:ring-[#2d6a4f]/15'
    }`;

  const busy = status === 'submitting';
  const done = status === 'success';

  return (
    <>
      <Head>
        <title>Payment | EKS Payment Gateway</title>
        <meta name="description" content="Complete your secure payment" />
      </Head>

      <MobileFrame>
        {/* 1. Header */}
        <BackHeader title="Secure Checkout" backHref="/checkout" />

        {!ready ? (
          <div className="flex-1" aria-busy="true" />
        ) : lines.length === 0 ? (
          <EmptyCart />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
            <div className="flex-1 space-y-5 px-5 py-5">
              {/* 2. Shipping address */}
              <fieldset
                className="space-y-3 rounded-2xl border border-[#e4ddd3]/50 bg-[#f0ebe4]/30 p-4"
                disabled={busy || done}
              >
                <legend className="mb-1 flex items-center gap-2 px-0.5 text-sm font-bold text-[#2e261c]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ecf5ee] text-xs">📍</span>
                  Shipping Address
                </legend>

                <div>
                  <label htmlFor="fullName" className="mb-1 block text-xs font-medium text-[#7a6b52]">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={shipping.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    className={inputClass(!!errors.fullName)}
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="mb-1 block text-xs font-medium text-[#7a6b52]">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    value={shipping.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    className={inputClass(!!errors.address)}
                    placeholder="Street, city, postal code"
                  />
                  {errors.address && (
                    <p id="address-error" className="mt-1 text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-xs font-medium text-[#7a6b52]">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={shipping.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={inputClass(!!errors.phone)}
                    placeholder="0812 3456 7890"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </fieldset>

              {/* 3. Payment method — card-style selection */}
              <fieldset
                className="rounded-2xl border border-[#e4ddd3]/50 bg-[#f0ebe4]/30 p-4"
                disabled={busy || done}
              >
                <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-[#2e261c]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ecf5ee] text-xs">💰</span>
                  Payment Method
                </legend>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((option) => {
                    const isSelected = method === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                          isSelected
                            ? 'border-[#2d6a4f] bg-[#ecf5ee] shadow-sm'
                            : 'border-transparent bg-white/60 hover:bg-white hover:border-[#e4ddd3]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => setMethod(option.value)}
                          className="sr-only"
                        />
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0ebe4] text-lg">
                          {option.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#2e261c]">{option.label}</p>
                          <p className="text-xs text-[#7a6b52]">{option.desc}</p>
                        </div>
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                            isSelected ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-[#c9bba6]'
                          }`}
                        >
                          {isSelected && (
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* 4. Order summary */}
              <section
                aria-labelledby="order-summary-title"
                className="rounded-2xl border border-[#e4ddd3]/50 bg-[#f0ebe4]/30 p-4"
              >
                <h2 id="order-summary-title" className="mb-3 flex items-center gap-2 text-sm font-bold text-[#2e261c]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ecf5ee] text-xs">🧾</span>
                  Order Summary
                </h2>
                <dl className="space-y-2">
                  <PriceRow
                    label={`Item(s) (${itemCount})`}
                    value={formatCurrency(totals.total)}
                  />
                  <PriceRow label="Shipping" value={formatCurrency(shippingFee)} />
                  <PriceRow label="Total" value={formatCurrency(grandTotal)} strong />
                </dl>
              </section>
            </div>

            {/* 5. Action */}
            <div className="space-y-3 px-5 pb-6">
              {status === 'error' && (
                <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700 border border-red-100">
                  Something went wrong while creating your payment. Please try again.
                </p>
              )}
              {done && (
                <p role="status" className="rounded-xl bg-[#ecf5ee] px-3 py-2.5 text-sm text-[#1b4332] border border-[#d4ead8]">
                  Order <span className="font-semibold">{reference}</span> confirmed. Waiting for payment.
                </p>
              )}
              <button
                type="submit"
                disabled={busy || done}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4332] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1b4332]/20 transition hover:bg-[#2d6a4f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] focus-visible:ring-offset-2"
              >
                <LockIcon className="h-4 w-4" />
                {busy ? 'Processing…' : done ? 'Order Confirmed' : 'Confirm & Pay'}
              </button>
            </div>
          </form>
        )}
      </MobileFrame>
    </>
  );
}