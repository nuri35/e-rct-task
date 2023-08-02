import { IEmailTemplate } from '../EmailTemplate';

interface IVerifyMailTemplate {
  name: string;
  lastName: string;
  urlToken: string;
}

export class VerifyEmailTemplate implements IEmailTemplate {
  constructor(private emailObj: IVerifyMailTemplate) {}
  generateEmailBody(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Mail</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
    
        <table style="max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse; border: 1px solid #ccc;">
            <tr>
                <td style="text-align: center; background-color: #f7f7f7;">
                    <h1 style="margin: 0; padding: 20px 0;">Welcome!</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p>Merhaba ${this.emailObj.name} ${this.emailObj.lastName},</p>
                    <p>Please click the link below to confirm your email:</p>
                <p><a href=${this.emailObj.urlToken} style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Click</a></p>
                   
                </td>
            </tr>
            <tr>
                <td style="text-align: center; background-color: #f7f7f7;">
                    <p style="margin: 0; padding: 10px;">This e-mail has been sent automatically, please do not reply.</p>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    

      `;
  }
}
