import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFoodVariant extends Document {
  foodId: Types.ObjectId;
  title: string;
  price: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const foodVariantSchema = new Schema<IFoodVariant>(
  {
    foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true, index: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    isRequired: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const FoodVariant = mongoose.model<IFoodVariant>('FoodVariant', foodVariantSchema);
