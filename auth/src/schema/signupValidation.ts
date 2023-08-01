import { body } from 'express-validator';
import { Password } from '../passwordService/password';

const validationSignup = {
  signupSchema: [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').custom((value: string, { req }) => {
      const schema = Password.schemaValidator();
      const isPasswordValid = schema.validate(value) as boolean;
      if (!isPasswordValid) {
        throw new Error('password not valid');
      }
      return true;
    }),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('lastName').not().isEmpty().withMessage('Lastname is required'),
  ],
};

export { validationSignup };
