import { IEmailTemplate } from '../EmailTemplate';

interface IVerifyMailTemplate {
  name: string;
  lastName: string;
  urlToken: string;
}

export class VerifyEmailTemplate implements IEmailTemplate {
  constructor(private emailObj: IVerifyMailTemplate) {}
  generateEmailBody(): string {
    // Şablon oluşturma işlemi burada gerçekleştirilecek
    // Bu örnek, basit bir metin şablonu kullanıyor bu task şablonu firma için yapıldı.
    return `
        Hello ${this.emailObj.name} ${this.emailObj.lastName},

        Click the link below to verify your e-mail address::
        ${this.emailObj.urlToken}

        Have a nice day,

      `;
  }
}
