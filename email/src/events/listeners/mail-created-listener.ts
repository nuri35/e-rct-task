import { Listener, EmailCreatedEvent, Subject } from '@fbticketss/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { sendEmail } from '../../service/email';

export class EmailCreatedListener extends Listener<EmailCreatedEvent> {
  subject: Subject.EmailCreated = Subject.EmailCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmailCreatedEvent['data'], msg: Message) {
    // await sendEmail(data);
    console.log(data.template);
    msg.ack();
  }
}
