import { body } from 'express-validator';

const validationAccountCr = {
  accountCrSchema: [
    body('accountName')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account name must be between 4 and 20 characters'),
    body('accountEmail').trim().isEmail().withMessage('Email must be valid'),
    body('accountTitle')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account title must be between 4 and 20 characters'),
    body('accountIdtaxNumber')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Account idtaxNumber must be between 4 and 20 characters'),
    body('accountPhone')
      .trim()
      .notEmpty()
      .withMessage('phone number cannot be blank')
      .isMobilePhone('tr-TR', { strictMode: true })
      .withMessage('Please enter a valid phone number'),
    body('accountAddress')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Account address must be between 4 and 50 characters'),
    body('accountCountry')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Account country must be between 4 and 10 characters'),
  ],
};

export { validationAccountCr };
