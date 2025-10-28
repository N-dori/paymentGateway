import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
  merchant_id: string;
  amount: number;
  status: 'pending' | 'confirmed';
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  merchant_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default model<IPayment>('Payment', PaymentSchema);
