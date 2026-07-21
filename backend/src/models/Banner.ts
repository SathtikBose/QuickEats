import mongoose, { Document, Schema, Types } from 'mongoose';

export enum RedirectType {
  RESTAURANT = 'Restaurant',
  CATEGORY = 'Category',
  FOOD = 'Food',
  OFFER = 'Offer',
  EXTERNAL_LINK = 'External Link',
}

export interface IBanner extends Document {
  title: string;
  image: string;
  redirectType: RedirectType;
  redirectId?: string; // Could be a URL or an ObjectId string
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    redirectType: { type: String, enum: Object.values(RedirectType), required: true },
    redirectId: { type: String },
    priority: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Banner = mongoose.model<IBanner>('Banner', bannerSchema);
