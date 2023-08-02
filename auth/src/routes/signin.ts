import express from 'express';
import { validateRequest } from '@fbticketss/common';
import { validationSignin } from '../schema/signinValidation';
import { SigninCntrol } from '../controllers/Signin';

const router = express.Router();

router.post(
  '/api/auth/signin',
  validationSignin.signinSchema,
  validateRequest,
  SigninCntrol.signinHandler
);

export { router as signinRouter };
