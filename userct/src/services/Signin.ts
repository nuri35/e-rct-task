import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { BadRequestError, EmailType } from '@fbticketss/common';
import { databaseSource } from '../database/dataSource';
import { SigninInput } from './SrvInterfaces';
import { Password } from '../passwordService/password';
import { TokenProvider } from '../jwt/TokenProvider';

class SigninService {
  private cn!: DataSource;
  constructor() {
    this.cn = databaseSource._connection;
  }
  async signin(data: SigninInput) {
    try {
      const userRepo = this.cn.getRepository(User);
      const existingUser = await userRepo.findOne({
        where: { email: data.email, isActive: true },
      });

      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }

      const passwordsMatch = await Password.compare(
        existingUser.password,
        data.password
      );
      if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
      }

      const token = TokenProvider.signJWT(existingUser.id);
      const { password, ...userWithoutPassword } = existingUser;

      return { token, user: userWithoutPassword };
    } catch (error: any) {
      throw error;
    }
  }
}
const signinSrv = new SigninService();
export { signinSrv as SigninSrv };
