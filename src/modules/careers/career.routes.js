import express from 'express';
import careerController from './career.controller.js';
import { applyValidation } from './career.validation.js';
import validate from '../../middlewares/validate.middleware.js';
import { uploadResume } from '../../config/multer.config.js';
import { handleUploadError } from '../../middlewares/upload.middleware.js';

const router = express.Router();

// Public Route: Submit Career Application with Resume Upload
router.post(
  '/apply',
  handleUploadError(uploadResume.single('resume')),
  applyValidation,
  validate,
  careerController.apply
);

export default router;
