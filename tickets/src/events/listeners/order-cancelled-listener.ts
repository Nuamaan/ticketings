import { Listener, OrderCancelledEvent, Subjects } from "@nuamaantickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject:Subjects.OrderCancelled=Subjects.OrderCancelled;
    queueGroupName=queueGroupName;

    async onMessage(data:OrderCancelledEvent['data'],msg:Message){
        const ticket =  await Ticket.findById(data.ticket.id)
        // If no ticket throw error 
        if(!ticket){
            throw new Error('ticket not found')
        }
        // mark the ticket as reserved by setting the orderId property 
        ticket.set({orderId:undefined});
        //save the tickrt 
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id:ticket.id,
            price:ticket.price,
            title:ticket.title,
            userId:ticket.userId,
            orderId:ticket.orderId,
            version:ticket.version
        });
        //ack the message
        msg.ack();
    }
        
}
