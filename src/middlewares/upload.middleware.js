import multer from 'multer';
import ApiError from '../utils/apiError.js';

/**
 * Handles Multer file upload errors gracefully
 */
export const handleUploadError = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File size too large. Maximum size limit exceeded.'));
        }
        return next(new ApiError(400, `Upload error: ${err.message}`));
      } else if (err) {
        return next(new ApiError(400, err.message));
      }
      next();
    });
  };
};
