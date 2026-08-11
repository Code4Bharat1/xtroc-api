import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import envConfig from './config/env.config.js';
import errorHandler from './middlewares/error.middleware.js';
import ApiError from './utils/apiError.js';

// Import Module Routes
import authRoutes from './modules/auth/auth.routes.js';
import testimonialRoutes from './modules/testimonials/testimonial.routes.js';
import careerRoutes from './modules/careers/career.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS Setup
const allowedOrigins = ["https://xtorcind.com","www://xtorcind.com"]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy restriction: Origin not allowed.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// General Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP address, please try again after 15 minutes.'
});
app.use('/api', limiter);

// Request Parsing Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logger Middleware
if (envConfig.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Static directory for uploaded testimonial avatars
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Welcome / Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'XTORC API Server is running.',
    healthCheck: '/health'
  });
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: envConfig.nodeEnv
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/careers', careerRoutes);

// Handle 404 Routes
app.use('*', (req, res, next) => {
  next(new ApiError(404, `Cannot find route '${req.originalUrl}' on this server.`));
});

// Global Centralized Error Handler
app.use(errorHandler);

export default app;
