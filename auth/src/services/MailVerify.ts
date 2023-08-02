import { TokenProvider } from '../jwt/TokenProvider';
import {
  InvalidTokenError,
  ExpiredTokenError,
  BadRequestError,
} from '@fbticketss/common';
import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { databaseSource } from '../database/dataSource';

class MailVerifyService {
  private cn!: DataSource;
  constructor() {
    this.cn = databaseSource._connection;
  }
  async mailVerify(token: string) {
    try {
      const tokenObj = TokenProvider.verifyJWT(token);

      const userRepo = this.cn.getRepository(User);
      const notConfirmUser = await userRepo.findOneBy({
        id: tokenObj.id,
        isActive: false,
      });
      if (!notConfirmUser) {
        throw new BadRequestError('User already confirmed');
      }
      await userRepo.update(tokenObj.id, { isActive: true });
      return true;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ExpiredTokenError('Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new InvalidTokenError('Invalid token');
      }

      throw error;
    }
  }
}

const mailVerifySrv = new MailVerifyService();
export { mailVerifySrv as MailVerifySrv };
