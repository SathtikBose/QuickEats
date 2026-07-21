import mongoose, { Document, Schema, Types } from 'mongoose';
import { DiscountType } from './Coupon';

export interface IOffer extends Document {
  restaurantId: Types.ObjectId;
  title: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    discountType: { type: String, enum: Object.values(DiscountType), required: true },
    discountValue: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Offer = mongoose.model<IOffer>('Offer', offerSchema);
