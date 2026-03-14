require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(`Blocked by CORS: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Backend running');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Server startup failed:', error);
  });
}

module.exports = app;
module.exports.startServer = startServer;