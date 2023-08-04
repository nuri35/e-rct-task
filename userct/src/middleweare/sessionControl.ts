import { Request, NextFunction, Response } from 'express';
import { User } from '../entities/User';
import { databaseSource } from '../database/dataSource';
import { BadRequestError } from '@fbticketss/common';

export const sessionControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceValue = req.headers['user-agent'] as string; // cihaaz bilgisi
  try {
    const cn = databaseSource._connection;
    const userRepo = cn.getRepository(User);
    const existingUser = await userRepo.findOne({
      where: { email: req.body.email, isActive: true },
    });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    if (existingUser.deviceUser && req.currentUser) {
      if (existingUser.deviceUser !== deviceValue) {
        existingUser.deviceUser = deviceValue;
        await userRepo.save(existingUser);
        req.session = null; // diger butun oturumları siler.
      }
      if (existingUser.deviceUser === deviceValue) {
        throw new BadRequestError(
          'You are already logged in from the same device'
        );
      }
    }

    if (!existingUser.deviceUser && !req.currentUser) {
      existingUser.deviceUser = deviceValue;
      await userRepo.save(existingUser);
    }
    if (existingUser.deviceUser && !req.currentUser) {
      existingUser.deviceUser = deviceValue;
      await userRepo.save(existingUser);
      req.session = null;
    }
    console.log('*****');
    next();
  } catch (error: any) {
    throw error;
  }
};
