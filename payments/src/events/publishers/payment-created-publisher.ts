import { PaymentCreatedEvent, Publisher, Subjects } from "@nuamaantickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}