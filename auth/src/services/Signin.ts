import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { BadRequestError, EmailType } from '@fbticketss/common';
import { databaseSource } from '../database/dataSource';

class SigninService {
  private cn!: DataSource;
  constructor() {
    this.cn = databaseSource._connection;
  }
  async signin(user: User) {
    try {
      const userRepo = this.cn.getRepository(User);
      return 'ok';
    } catch (error: any) {
      throw error;
    }
  }
}
const signinSrv = new SigninService();
export { signinSrv as SigninSrv };
