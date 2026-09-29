import connectToDatabase from '../../lib/mongodb';
import Payment from '../../models/Payment';
import Checkout from '../../models/Checkout';

export default async function handler(req, res) {
  // Hanya terima method POST dari webhook Xendit
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    await connectToDatabase();

    const payload = req.body;
    console.log('[Xendit Webhook Received]:', JSON.stringify(payload, null, 2));

    const { id, external_id, status, paid_at, payment_method } = payload || {};

    // Jika ini adalah event "Test and save" dari dashboard Xendit
    if (!external_id) {
      return res.status(200).json({
        success: true,
        message: 'Webhook test received successfully by Next.js endpoint',
      });
    }

    // Cari data Payment berdasarkan externalId
    const payment = await Payment.findOne({ externalId: external_id });

    if (!payment) {
      console.warn(`[Webhook Warning] Payment with externalId ${external_id} not found in database.`);
      return res.status(200).json({
        success: true,
        message: 'Payment record not found, webhook acknowledged',
      });
    }

    // Jika invoice Xendit statusnya PAID atau SETTLED
    if (status === 'PAID' || status === 'SETTLED') {
      payment.status = 'PAID';
      payment.xenditInvoiceId = id || payment.xenditInvoiceId;
      payment.paymentMethod = payment_method || payment.paymentMethod;
      payment.paidAt = paid_at ? new Date(paid_at) : new Date();
      payment.rawWebhookData = payload;
      await payment.save();

      // Update status Checkout terkait menjadi CONFIRMED
      if (payment.checkoutId) {
        await Checkout.findByIdAndUpdate(payment.checkoutId, { status: 'CONFIRMED' });
      }

      console.log(`[Webhook Success] Payment ${external_id} marked as PAID.`);
    } else if (status === 'EXPIRED') {
      payment.status = 'EXPIRED';
      await payment.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('[Webhook Error]:', error);
    return res.status(500).json({
      error: 'Internal server error while processing webhook',
      details: error.message,
    });
  }
}
