import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connect
connectDB();

// Middleware
app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://project-management-system-chi-ten.vercel.app'
    ],
    credentials: true
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health route
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'team-task-manager-api'
  });
});

// Home route
app.get('/', (_req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});