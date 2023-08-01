import { Publisher, Subject, EmailCreatedEvent } from '@fbticketss/common';

export class EmailCreatedPublisher extends Publisher<EmailCreatedEvent> {
  subject: Subject.EmailCreated = Subject.EmailCreated;
}
