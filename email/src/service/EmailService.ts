import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

class EmailService {
  private _transporter: nodemailer.Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport(
      smtpTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
          user: process.env.USER_MAIL_AUTH,
          pass: process.env.USER_MAIL_PASSWORD,
        },
      })
    );
    console.log('email service started');
  }

  get transporter(): nodemailer.Transporter {
    return this._transporter;
  }
}

export const emailService = new EmailService();
