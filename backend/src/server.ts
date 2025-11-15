import express, { Request, Response } from 'express';
import logger from './services/logger.service'
import cors from 'cors';
import path from 'path';
import http from 'http';
import  setupAsyncLocalStorage from './middlewares/setupAls.middleware'
import { setUp } from './services/socket.service';


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

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
 
 // routes
app.all('*', setupAsyncLocalStorage)

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)

app.get('/**', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
  setUp(server, corsOptions);
});
