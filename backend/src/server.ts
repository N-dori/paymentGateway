import express, { Request, Response } from 'express';
import logger from './services/logger.service'
import cors from 'cors';
import path from 'path';
import http from 'http';

const socketService =require('./services/socket.service')

import Payment, { IPayment } from './models/Payment';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());


const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://localhost:5175','http://127.0.0.1:5175'],
    credentials: true
}
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const orderRoutes = require('./api/order/order.routes')
const userRoutes = require('./api/user/user.routes')
 
 // routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/user', userRoutes)

app.get('/**', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
// http.listen(port, () => {
//     logger.info('Server is running on port: ' + port)
// })
socketService.setUp(http,corsOptions)
server.listen(port, () => {
    logger.info(`Server is running on port http://localhost:${port}`)
})

//   try {
//     const { merchant_id, amount } = req.body;
//     const payment: IPayment = await Payment.create({ merchant_id, amount });
//     io.emit('payment_created', payment);
//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create payment' });
//   }
// });

// app.post('/api/payments/:id/confirm', async (req, res) => {
//   try {
//     const payment: IPayment | null = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { status: 'confirmed' },
//       { new: true }
//     );
//     if (!payment) return res.status(404).json({ error: 'Payment not found' });
//     io.emit('payment_confirmed', payment);
//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to confirm payment' });
//   }
// });

// const PORT = process.env.PORT || 4000;
// connect(process.env.MONGO_URI || 'mongodb://localhost:27017/payment_gateway')
//   .then(() => server.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`)));
