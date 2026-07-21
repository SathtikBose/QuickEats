import mongoose, { Document, Schema, Types } from 'mongoose';

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface IOrder extends Document {
  orderNumber: string;
  userId: Types.ObjectId;
  restaurantId: Types.ObjectId;
  addressId: Types.ObjectId;
  paymentId?: Types.ObjectId;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  tax: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  estimatedDeliveryTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING, index: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, required: true },
    platformFee: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
    estimatedDeliveryTime: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
