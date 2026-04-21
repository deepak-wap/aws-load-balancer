import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import logger from './common/logger/index.js';
import routes from './routes.js';
import errorMiddleware from './common/middleware/error.middleware.js';
import config from './config/index.js';

const app = express();

// Database Connection
mongoose.connect(config.DB_URL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Database Connection failed", error));

// Security & Body Parsers
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// HTTP request logging
app.use(morgan('combined', { stream: { write: msg => logger.http(msg.trim()) } }));

// API routes
app.use(`/api/${config.APP_VERSION}`, routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Global error handling
app.use(errorMiddleware);

export default app;
