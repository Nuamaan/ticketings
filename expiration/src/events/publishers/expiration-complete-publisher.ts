import { ExpirationCompleteEvent, Publisher, Subjects } from "@nuamaantickets/common"

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}