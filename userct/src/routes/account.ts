import express from 'express';
import { requireAuth } from '@fbticketss/common';

const router = express.Router();

router.post('/api/user/account', requireAuth);

router.get('/api/user/account', requireAuth);

router.put('/api/user/account', requireAuth);

router.delete('/api/user/account', requireAuth);

export { router as accountRouter };
