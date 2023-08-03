import express from 'express';
import { MailVerifyCntrl } from '../controllers/MailVerify';
const router = express.Router();

router.get('/api/user/wVerify', MailVerifyCntrl.mailVerifyHandler);

export { router as mailVerifyRouter };
