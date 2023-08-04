import express from 'express';
import { requireAuth } from '@fbticketss/common';
import { databaseSource } from '../database/dataSource';
import User from '../entities/User';

const router = express.Router();

router.post('/api/user/signout', requireAuth, async (req, res) => {
  req.session = null;
  const cn = databaseSource._connection;
  const userRepo = cn.getRepository(User);
  const existingUser = (await userRepo.findOne({
    where: { id: req.currentUser!.id as number, isActive: true },
  })) as User;

  existingUser.deviceUser = null as unknown as string;
  await userRepo.save(existingUser);

  res.send({});
});

export { router as signoutRouter };
