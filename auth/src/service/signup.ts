import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { BadRequestError, EmailType } from '@fbticketss/common';
import { databaseSource } from '../database/dataSource';
import { Password } from '../passwordService/password';
import { EmailCreatedPublisher } from './../events/publishers/mail-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { EmailTemplate } from './../mailTemplate/EmailTemplate';
import { TokenProvider } from './../jwt/TokenProvider';

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
      const urlToken = TokenProvider.generateUrlToken(valUser.id);
      const emailTemplate = EmailTemplate._templateRunRecursive(
        valUser,
        urlToken
      ).run(); //! object composition design pattern
      await new EmailCreatedPublisher(natsWrapper.client).publish({
        email: valUser.email,
        template: emailTemplate,
        type: EmailType.Verify,
      });
      return User.removePassword(valUser);
    } catch (error: any) {
      throw error;
    }
  }
}
const SignupSrv = new SignupService();
export { SignupSrv };
