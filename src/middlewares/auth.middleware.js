import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import envConfig from '../config/env.config.js';
import Admin from '../modules/auth/auth.model.js';

/**
 * Middleware to authenticate requests using JWT (Cookies or Bearer Header)
 */
export const authenticateAdmin = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Authentication required. Please log in to access this resource.');
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      throw new ApiError(401, 'User account no longer exists.');
    }

    req.user = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid authentication token.');
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Authentication token expired. Please log in again.');
    }
    throw error;
  }
});
