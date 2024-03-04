import { Publisher, Subjects, TicketUpdatedEvent } from "@nuamaantickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated; 
}