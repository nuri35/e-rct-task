import express from 'express';
import { validateRequest } from '@fbticketss/common';
import { validationSignin } from '../schema/signinValidation';
import { SigninCntrol } from '../controllers/Signin';
import { sessionControl } from '../middleweare/sessionControl';

const router = express.Router();

router.post(
  '/api/user/signin',
  sessionControl,
  validationSignin.signinSchema,
  validateRequest,
  SigninCntrol.signinHandler
);

export { router as signinRouter };
