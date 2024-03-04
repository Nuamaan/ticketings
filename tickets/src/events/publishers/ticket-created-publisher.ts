import { Publisher, Subjects, TicketCreatedEvent } from "@nuamaantickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated; 
}