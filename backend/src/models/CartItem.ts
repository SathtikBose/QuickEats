import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICartItem extends Document {
  cartId: Types.ObjectId;
  foodId: Types.ObjectId;
  quantity: number;
  selectedVariants?: string[];
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true, index: true },
    foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true, index: true },
    quantity: { type: Number, required: true, min: 1 },
    selectedVariants: [{ type: String }],
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);
