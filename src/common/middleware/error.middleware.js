// src/common/middleware/error.middleware.js
import logger from '../../common/logger/index.js';
import chalk from 'chalk';
import { getErrorLocation } from '../utils/error.util.js';

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const errorLocation = getErrorLocation(err.stack);

    // Mongo-specific error parsing
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation failed'
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate key error'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token has expired',
        });
    }

    let errMsg = `[${req.method}] ${req.originalUrl}`

    if (errorLocation) {
        const { file, line } = errorLocation;
        errMsg = errMsg + ` - Error occurred in ${file} file in line number ${line}`
    }

    // Console (colored)
    console.error(chalk.red(errMsg));

    // Logger
    logger.error({
        level: 'error',
        message,
        status,
        method: req.method,
        path: req.originalUrl,
        stack: err.stack,
        location: errorLocation,
    });

    // API response
    return res.status(status).json({
        success: false,
        message
    });
};

export default errorMiddleware;