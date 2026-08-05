import express from 'express';
import testimonialController from './testimonial.controller.js';
import {
  createTestimonialValidation,
  updateStatusValidation,
  updateTestimonialValidation,
  idParamValidation
} from './testimonial.validation.js';
import validate from '../../middlewares/validate.middleware.js';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';
import { uploadAvatar } from '../../config/multer.config.js';
import { handleUploadError } from '../../middlewares/upload.middleware.js';

const router = express.Router();

// Public Routes
// 1. Submit Testimonial (Optional profile image upload)
router.post(
  '/',
  handleUploadError(uploadAvatar.single('profileImage')),
  createTestimonialValidation,
  validate,
  testimonialController.create
);

// 2. Get Public Approved Testimonials
router.get('/', testimonialController.getPublicList);

// Protected Admin Routes
// 3. View All Testimonials (Admin Dashboard with status filter & pagination)
router.get('/admin', authenticateAdmin, testimonialController.getAdminList);

// 4. Update Testimonial Status (Approve / Reject)
router.patch(
  '/admin/:id/status',
  authenticateAdmin,
  updateStatusValidation,
  validate,
  testimonialController.updateStatus
);

// 5. Update Testimonial Details (Admin)
router.put(
  '/admin/:id',
  authenticateAdmin,
  handleUploadError(uploadAvatar.single('profileImage')),
  updateTestimonialValidation,
  validate,
  testimonialController.update
);

// 6. Delete Testimonial (Admin)
router.delete(
  '/admin/:id',
  authenticateAdmin,
  idParamValidation,
  validate,
  testimonialController.delete
);

export default router;
