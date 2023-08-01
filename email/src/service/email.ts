import { EmailCreatedEvent } from '@fbticketss/common';

async function sendEmail(data: EmailCreatedEvent['data']) {
  try {
    console.log('send sms email', data);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}

export { sendEmail };
