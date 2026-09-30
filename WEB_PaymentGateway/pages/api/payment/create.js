import { Xendit } from 'xendit-node';
import connectToDatabase from '../../../lib/mongodb';
import Checkout from '../../../models/Checkout';
import Payment from '../../../models/Payment';

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    await connectToDatabase();
    
    const { items, shipping, method, totals, shippingFee, grandTotal } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Create Checkout record
    const checkoutItems = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const checkout = new Checkout({
      items: checkoutItems,
      subtotal: totals.total, // Because in pricing.ts `total` might be subtotal before shipping
      tax: totals.tax || 0,
      shipping: shippingFee,
      total: grandTotal,
      status: 'PENDING',
    });
    
    await checkout.save();

    // Generate externalId
    const externalId = `ORD-${checkout._id}`;

    // Determine baseUrl dynamically (supports localhost, ngrok, and Vercel automatically)
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['host'];
    const detectedBaseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || detectedBaseUrl;

    const successRedirectUrl = `${baseUrl}/payment-success?order_id=${externalId}`;
    const failureRedirectUrl = `${baseUrl}/payment-failed?order_id=${externalId}`;

    // Map frontend payment method to Xendit allowed payment channels
    const methodChannelMap = {
      qris: ['QRIS'],
      gopay: ['GOPAY'],
      shopeepay: ['SHOPEEPAY'],
      bca_va: ['BCA'],
      mandiri_va: ['MANDIRI'],
      credit_card: ['CREDIT_CARD'],
    };

    const allowedPaymentMethods = methodChannelMap[method] || undefined;

    const invoiceData = {
      externalId: externalId,
      amount: grandTotal,
      description: `Payment for Order ${externalId}`,
      customer: {
        givenNames: shipping.fullName,
        mobileNumber: shipping.phone,
        addresses: [
          {
            streetLine1: shipping.address,
            country: 'ID'
          }
        ]
      },
      paymentMethods: allowedPaymentMethods,
      successRedirectUrl,
      failureRedirectUrl,
      currency: 'IDR',
    };

    const invoice = await xenditClient.Invoice.createInvoice({ data: invoiceData });

    // Create Payment record
    const payment = new Payment({
      checkoutId: checkout._id,
      externalId: externalId,
      xenditInvoiceId: invoice.id,
      amount: grandTotal,
      paymentMethod: method,
      shippingAddress: {
        fullName: shipping.fullName,
        address: shipping.address,
        phone: shipping.phone,
      },
      status: 'PENDING',
      invoiceUrl: invoice.invoiceUrl,
    });

    await payment.save();

    return res.status(200).json({
      success: true,
      reference: externalId,
      invoiceUrl: invoice.invoiceUrl,
    });
  } catch (error) {
    console.error('[Create Payment Error]:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
