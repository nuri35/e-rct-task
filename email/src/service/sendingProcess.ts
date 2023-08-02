import nodemailer from 'nodemailer';
import { EmailType } from '@fbticketss/common';

async function sendEmail(
  to: string,
  text: string,
  transporter: nodemailer.Transporter,
  type: EmailType
): Promise<void> {
  const mailOptions = {
    from: process.env.USER_MAIL_AUTH,
    subject: type,
    to,
    html: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error(error.message);
  }
}

export { sendEmail };
