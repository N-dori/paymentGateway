// frontend/types/Payment.ts
export interface Payment {
  _id: string;
  merchant_id: string;
  amount: number;
  status: 'pending' | 'confirmed';
  createdAt: string;
}
