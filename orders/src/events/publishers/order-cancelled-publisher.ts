import { OrderCancelledEvent, Publisher, Subjects } from "@nuamaantickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}