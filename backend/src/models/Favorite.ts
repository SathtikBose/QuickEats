import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFavorite extends Document {
  userId: Types.ObjectId;
  restaurantId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema);
