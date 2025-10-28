import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connect } from './db';
import Payment, { IPayment } from './models/Payment';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => console.log('WS client connected:', socket.id));

app.post('/api/payments', async (req, res) => {
  try {
    const { merchant_id, amount } = req.body;
    const payment: IPayment = await Payment.create({ merchant_id, amount });
    io.emit('payment_created', payment);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

app.post('/api/payments/:id/confirm', async (req, res) => {
  try {
    const payment: IPayment | null = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    io.emit('payment_confirmed', payment);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

const PORT = process.env.PORT || 4000;
connect(process.env.MONGO_URI || 'mongodb://localhost:27017/payment_gateway')
  .then(() => server.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`)));
