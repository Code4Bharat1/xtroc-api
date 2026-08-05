import ApiError from '../utils/apiError.js';
import envConfig from '../config/env.config.js';
import logger from '../utils/logger.js';

/**
 * Global centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const { statusCode, message, errors, stack } = error;

  logger.error(`[HTTP ${statusCode}] ${req.method} ${req.originalUrl} - ${message}`);

  const response = {
    success: false,
    statusCode,
    message,
    ...(errors && errors.length > 0 && { errors }),
    ...(envConfig.nodeEnv === 'development' && { stack })
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
