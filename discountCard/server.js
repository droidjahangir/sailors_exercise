import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoutes.js';
import shoppingCardRoutes from './routes/shoppingCardRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('api running');
  res.send('API is running....');
});

app.use('/api/shoppingCard', shoppingCardRoutes);
app.use('/api/upload', uploadRoutes);

// make uploads folder to static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
