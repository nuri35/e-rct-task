import express from 'express';
import { requireAuth, validateRequest } from '@fbticketss/common';
import { validationAccountCr } from '../schema/accountCrValidation';
import { validationAccountUp } from '../schema/accountUpValidation';
import { AccountCtrl } from '../controllers/Account';

const router = express.Router();

router.post(
  '/api/user/account',
  requireAuth,
  validationAccountCr.accountCrSchema,
  validateRequest,
  AccountCtrl.accountCreateHandler
);

router.get('/api/user/account', requireAuth, AccountCtrl.accountGetHandler);

router.put(
  '/api/user/account',
  requireAuth,
  validationAccountUp.accountUpSchema,
  validateRequest,
  AccountCtrl.accountUpdateHandler
);

router.delete(
  '/api/user/account',
  requireAuth,
  AccountCtrl.accountDeleteHandler
);

export { router as accountRouter };
