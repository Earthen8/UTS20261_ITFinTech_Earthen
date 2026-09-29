import connectToDatabase from '../../../lib/mongodb';
import Payment from '../../../models/Payment';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ error: 'order_id is required' });
  }

  try {
    await connectToDatabase();
    
    const payment = await Payment.findOne({ externalId: order_id });
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json({
      success: true,
      status: payment.status,
      externalId: payment.externalId,
    });
  } catch (error) {
    console.error('[Payment Status Error]:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
