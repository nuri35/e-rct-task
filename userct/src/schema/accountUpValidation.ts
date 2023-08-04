import { body } from 'express-validator';

const validationAccountUp = {
  accountUpSchema: [
    body('accountName')
      .optional()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account name must be between 4 and 20 characters'),
    body('accountEmail').trim().isEmail().withMessage('Email must be valid'),
    body('accountTitle')
      .optional()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account title must be between 4 and 20 characters'),
    body('accountIdtaxNumber')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account idtaxNumber must be between 4 and 20 characters'),
    body('accountPhone')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('phone number cannot be blank')
      .isMobilePhone('tr-TR', { strictMode: true })
      .withMessage('Please enter a valid phone number'),
    body('accountAddress')
      .optional()
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Account address must be between 4 and 50 characters'),
    body('accountCountry')
      .optional()
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Account country must be between 4 and 10 characters'),
  ],
};

export { validationAccountUp };
