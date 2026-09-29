import mongoose from 'mongoose';

const ShippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  phone: { type: String, default: '' },
});

const PaymentSchema = new mongoose.Schema(
  {
    checkoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Checkout',
      required: true,
    },
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    xenditInvoiceId: {
      type: String,
      default: '',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      default: 'XENDIT_INVOICE',
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      default: () => ({}),
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'EXPIRED', 'FAILED'],
      default: 'PENDING',
      index: true,
    },
    invoiceUrl: {
      type: String,
      default: '',
    },
    paidAt: {
      type: Date,
      default: null,
    },
    rawWebhookData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
