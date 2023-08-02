import { Listener, EmailCreatedEvent, Subject } from '@fbticketss/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { emailService } from '../../service/EmailService';
import { sendEmail } from '../../service/sendingProcess';

export class EmailCreatedListener extends Listener<EmailCreatedEvent> {
  subject: Subject.EmailCreated = Subject.EmailCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmailCreatedEvent['data'], msg: Message) {
    const { template, email, type } = data;
    await sendEmail(email, template, emailService.transporter, type);

    msg.ack();
  }
}
