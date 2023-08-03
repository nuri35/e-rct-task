import { body } from 'express-validator';
import { Password } from '../passwordService/password';

const validationSignin = {
  signinSchema: [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').custom((value: string, { req }) => {
      const schema = Password.schemaValidator();
      const isPasswordValid = schema.validate(value) as boolean;
      if (!isPasswordValid) {
        throw new Error('password not valid');
      }
      return true;
    }),
  ],
};

export { validationSignin };
