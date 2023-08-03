import express from 'express';
import { requireAuth } from '@fbticketss/common';

const router = express.Router();

router.post('/api/auth/signout', requireAuth, (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };