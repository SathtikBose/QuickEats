import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
  ownerName: string;
  restaurantName: string;
  email: string;
  phone: string;
  password?: string;
  googleId?: string;
  description?: string;
  cuisine: string[];
  address: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  deliveryRadius: number;
  coverImage?: string;
  logo?: string;
  openingTime: string; // e.g., "09:00"
  closingTime: string; // e.g., "22:00"
  isApproved: boolean;
  isOpen: boolean;
  isBlocked: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    ownerName: { type: String, required: true },
    restaurantName: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, select: false },
    googleId: { type: String },
    description: { type: String },
    cuisine: [{ type: String, index: true }],
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    deliveryRadius: { type: Number, required: true }, // in km or miles
    coverImage: { type: String },
    logo: { type: String },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
