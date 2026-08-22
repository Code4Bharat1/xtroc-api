import express from 'express';
import contactController from './contact.controller.js';
import { contactValidation } from './contact.validation.js';
import validate from '../../middlewares/validate.middleware.js';

const router = express.Router();

// Public Route: Submit Contact Enquiry
router.post(
  '/',
  contactValidation,
  validate,
  contactController.submitEnquiry
);

export default router;
