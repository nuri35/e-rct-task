import { VerifyEmailTemplate } from '../mailTemplate/verifyEmail/VerifyEmailTemplate';
import { User } from '../entities/User';

export interface IEmailTemplate {
  generateEmailBody(): string;
}

export class EmailTemplate {
  constructor(private mail: IEmailTemplate) {}

  static _templateRunRecursive(valUser: User, urlToken: string): EmailTemplate {
    return new EmailTemplate(
      new VerifyEmailTemplate({
        name: valUser.name,
        lastName: valUser.lastName,
        urlToken,
      })
    );
  }

  run(): string {
    return this.mail.generateEmailBody();
  }
}
