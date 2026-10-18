import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import poemRoutes from './routes/poemRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Poetry archive API is running.' });
});

app.use('/api/poems', poemRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
