import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPayment extends Document {
  orderId: Types.ObjectId;
  stripePaymentIntent?: string;
  paymentMethod: string; // e.g., "card", "upi"
  status: string; // PENDING, PAID, FAILED, REFUNDED
  amount: number;
  currency: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    stripePaymentIntent: { type: String, index: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, default: 'PENDING' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
