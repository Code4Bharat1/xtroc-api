import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

/**
 * Middleware to process express-validator validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg
    }));
    return next(new ApiError(400, 'Validation failed for request parameters', extractedErrors));
  }
  next();
};

export default validate;
