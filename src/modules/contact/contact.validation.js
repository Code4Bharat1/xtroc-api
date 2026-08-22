import { body } from 'express-validator';

export const contactValidation = [
  body('name')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isString()
    .withMessage('Name must be a valid text string.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full Name must be between 2 and 100 characters long.'),

  body('email')
    .notEmpty()
    .withMessage('Email Address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address (e.g. name@domain.com).')
    .normalizeEmail(),

  body('phone')
    .notEmpty()
    .withMessage('Phone Number is required.')
    .isString()
    .withMessage('Phone Number must be a valid text string.')
    .trim()
    .matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/)
    .withMessage('Please provide a valid phone number (7 to 15 digits).'),

  body('subject')
    .optional()
    .isString()
    .withMessage('Subject must be a valid text string.')
    .trim()
    .isLength({ max: 150 })
    .withMessage('Subject cannot exceed 150 characters.'),

  body('company')
    .optional()
    .isString()
    .withMessage('Company name must be a valid text string.')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters.'),

  body('message')
    .notEmpty()
    .withMessage('Message requirement is required.')
    .isString()
    .withMessage('Message must be a valid text string.')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters long.')
];
