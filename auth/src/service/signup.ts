import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { BadRequestError } from '@fbticketss/common';
import { databaseSource } from '../database/dataSource';
import { Password } from '../passwordService/password';

class SignupService {
  private cn!: DataSource;
  constructor() {
    this.cn = databaseSource._connection;
  }
  async signup(user: User) {
    try {
      const userRepo = this.cn.getRepository(User);
      const existingEmail = await userRepo.findOne({
        where: { email: user.email },
      });
      if (existingEmail) {
        throw new BadRequestError('Email already exists');
      }
      const hashpsw = await Password.toHash(user.password);
      user.password = hashpsw;
      const valUser = await userRepo.save(user);
      // sımdı emaıl yollama ıslemı yapılacak
      return User.removePassword(valUser);
    } catch (error: any) {
      throw error;
    }
  }
}
const SignupSrv = new SignupService();
export { SignupSrv };
