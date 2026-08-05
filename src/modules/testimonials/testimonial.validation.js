import { body, param } from 'express-validator';

export const createTestimonialValidation = [
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full Name cannot exceed 100 characters.'),
  body('company')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),
  body('designation')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
  body('reviewMessage')
    .notEmpty()
    .withMessage('Review Message is required.')
    .isString()
    .trim()
    .isLength({ min: 5, max: 2000 })
    .withMessage('Review Message must be between 5 and 2000 characters.')
];

export const updateStatusValidation = [
  param('id').isMongoId().withMessage('Invalid Testimonial ID.'),
  body('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status must be pending, approved, or rejected.')
];

export const updateTestimonialValidation = [
  param('id').isMongoId().withMessage('Invalid Testimonial ID.'),
  body('fullName').optional().isString().trim().isLength({ max: 100 }),
  body('company').optional().isString().trim().isLength({ max: 100 }),
  body('designation').optional().isString().trim().isLength({ max: 100 }),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('reviewMessage').optional().isString().trim().isLength({ min: 5, max: 2000 }),
  body('status').optional().isIn(['pending', 'approved', 'rejected'])
];

export const idParamValidation = [
  param('id').isMongoId().withMessage('Invalid Testimonial ID.')
];
