import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFood extends Document {
  restaurantId: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image?: string;
  isVeg: boolean;
  isAvailable: boolean;
  isBestSeller: boolean;
  preparationTime: number; // in minutes
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new Schema<IFood>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: String },
    isVeg: { type: Boolean, required: true },
    isAvailable: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    preparationTime: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Food = mongoose.model<IFood>('Food', foodSchema);
