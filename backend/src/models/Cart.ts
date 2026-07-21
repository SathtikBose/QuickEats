import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICart extends Document {
  userId: Types.ObjectId;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  tax: number;
  grandTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
