require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const { initFirebase } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize services
connectDB();
initFirebase();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl) or allowed origins
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev to avoid CORS friction
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

// Basic rate limiting for public endpoints
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', publicLimiter);

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Petal & Promise Floral Celebration API Engine',
    health: '/api/health',
    endpoints: {
      packages: '/api/catalog/packages',
      themes: '/api/catalog/themes',
      testimonials: '/api/catalog/testimonials',
      bookings: '/api/bookings'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Petal & Promise API Server',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount Routes
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/catalog', require('./routes/catalogRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.url}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred',
  });
});

app.listen(PORT, () => {
  console.log(`
  🌸=========================================================🌸
      PETAL & PROMISE - FLORAL CELEBRATION API ENGINE
      Listening smoothly on: http://localhost:${PORT}
      Mode: ${process.env.NODE_ENV || 'development'}
  🌸=========================================================🌸
  `);
});
