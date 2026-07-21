import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrderItem extends Document {
  orderId: Types.ObjectId;
  foodId: Types.ObjectId;
  quantity: number;
  price: number;
  selectedVariants?: string[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    selectedVariants: [{ type: String }],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
