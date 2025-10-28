// frontend/pages/index.tsx
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import type { Payment } from '../types/Payment';

export default function Home() {
  const [status, setStatus] = useState<string>('Idle');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to backend WebSocket
    const s: Socket = io(process.env.NEXT_PUBLIC_BACKEND_WS || 'http://localhost:4000');
    setSocket(s);

    s.on('connect', () => console.log('WS connected:', s.id));
    s.on('payment_confirmed', (msg: Payment) => setStatus('Payment confirmed: ' + msg._id));

    // Cleanup on unmount
    return () => { s.disconnect(); };
  }, []);

  // Create a new payment via API
  async function createPayment() {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    try {
      const res = await axios.post<Payment>(`${api}/api/payments`, { merchant_id: 'm1', amount: 1 });
      setStatus('Payment created: ' + res.data._id);
    } catch (error) {
      console.error(error);
      setStatus('Payment creation failed');
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Payment Gateway Frontend (TypeScript)</h1>
      <button onClick={createPayment}>Create Demo Payment</button>
      <p>Status: {status}</p>
    </div>
  );
}
