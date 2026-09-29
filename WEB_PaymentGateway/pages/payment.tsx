import Head from 'next/head';
import { FormEvent, useState } from 'react';
import MobileFrame from '../components/layout/MobileFrame';
import BackHeader from '../components/layout/BackHeader';
import EmptyCart from '../components/ui/EmptyCart';
import PriceRow from '../components/ui/PriceRow';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/format';
import { calculateTotals, getShippingFee } from '../lib/pricing';
import {
  createPayment,
  type PaymentMethod,
  type ShippingAddress,
} from '../lib/payment-service';

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'other', label: 'Other (e.g. E-Wallet, Bank Transfer)' },
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
  const { ready, lines, subtotal } = useCart();

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
      if (result.invoiceUrl) {
        window.location.href = result.invoiceUrl;
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 ${hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
    }`;

  const busy = status === 'submitting';
  const done = status === 'success';

  return (
    <>
      <Head>
        <title>Payment | Payment Gateway</title>
        <meta name="description" content="Secure payment gateway" />
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
            <div className="flex-1 space-y-6 px-5 py-5">
              {/* 2. Shipping address */}
              <fieldset className="space-y-3" disabled={busy || done}>
                <legend className="mb-3 text-sm font-semibold text-gray-900">Shipping Address</legend>

                <div>
                  <label htmlFor="fullName" className="mb-1 block text-xs font-medium text-gray-600">
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
                  <label htmlFor="address" className="mb-1 block text-xs font-medium text-gray-600">
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
                  <label htmlFor="phone" className="mb-1 block text-xs font-medium text-gray-600">
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

              {/* 3. Payment method */}
              <fieldset disabled={busy || done}>
                <legend className="mb-3 text-sm font-semibold text-gray-900">Payment Method</legend>
                <div className="space-y-1">
                  {PAYMENT_METHODS.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={method === option.value}
                        onChange={() => setMethod(option.value)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-indigo-600"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 4. Order summary */}
              <section aria-labelledby="order-summary-title">
                <h2 id="order-summary-title" className="mb-3 text-sm font-semibold text-gray-900">
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
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  Something went wrong while creating your payment. Please try again.
                </p>
              )}
              {done && (
                <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
                  Order <span className="font-semibold">{reference}</span> confirmed. Waiting for payment.
                </p>
              )}
              <button
                type="submit"
                disabled={busy || done}
                className="w-full rounded-xl bg-gray-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {busy ? 'Processing…' : done ? 'Order Confirmed' : 'Confirm & Pay'}
              </button>
            </div>
          </form>
        )}
      </MobileFrame>
    </>
  );
}