import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEarnings extends Document {
  restaurantId: Types.ObjectId;
  orderId: Types.ObjectId;
  amount: number;
  commission: number;
  netAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const earningsSchema = new Schema<IEarnings>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    amount: { type: Number, required: true },
    commission: { type: Number, required: true },
    netAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Earnings = mongoose.model<IEarnings>('Earnings', earningsSchema);
