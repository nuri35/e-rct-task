import express from 'express';
import { SignupCntrol } from '../controllers/Signup';
import { validateRequest } from '@fbticketss/common';
import { validationSignup } from '../schema/signupValidation';

const router = express.Router();

router.post(
  '/api/user/signup',
  validationSignup.signupSchema,
  validateRequest,
  SignupCntrol.signupHandler
);

export { router as signupRouter };
