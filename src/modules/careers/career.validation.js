import { body } from 'express-validator';

export const applyValidation = [
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full Name cannot exceed 100 characters.'),

  body('email')
    .notEmpty()
    .withMessage('Email Address is required.')
    .isEmail()
    .withMessage('Please provide a valid Email Address.')
    .normalizeEmail(),

  body('mobileNumber')
    .notEmpty()
    .withMessage('Mobile Number is required.')
    .isString()
    .trim()
    .matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage('Please provide a valid Mobile Number.'),

  body('currentCity')
    .notEmpty()
    .withMessage('Current City is required.')
    .isString()
    .trim()
    .isLength({ max: 100 }),

  body('positionInterestedIn')
    .notEmpty()
    .withMessage('Position Interested In is required.')
    .isIn([
      'Sales',
      'Service',
      'Design & R&D',
      'Production',
      'Accounts',
      'HR & Admin',
      'Marketing',
      'Internship',
      'Other'
    ])
    .withMessage('Invalid position selected.'),

  body('totalExperience')
    .notEmpty()
    .withMessage('Total Experience is required.')
    .isIn(['Fresher', '0–2 Years', '2–5 Years', '5+ Years', '0-2 Years', '2-5 Years'])
    .withMessage('Invalid experience selection.'),

  body('currentCompany')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),

  body('currentDesignation')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),

  body('noticePeriod')
    .notEmpty()
    .withMessage('Notice Period is required.')
    .isIn(['Immediate', '15 Days', '30 Days', '60+ Days'])
    .withMessage('Invalid notice period selection.'),

  body('whyJoinXtorc')
    .notEmpty()
    .withMessage('Reason for wanting to join XTORC is required.')
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Why do you want to join XTORC must not exceed 500 characters.')
];
