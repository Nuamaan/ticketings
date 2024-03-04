import mongoose from "mongoose";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedEvent } from "@nuamaantickets/common";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";

const setup = async () => {
    //craete an instance of the listener 
    const listener = new TicketUpdatedListener(natsWrapper.client)
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title:'Concert',
        price:20
    })
    await ticket.save()

    //create a fake data event 
    const data:TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title:'new concert',
        price:999,
        userId:'asdfasdf'
    };
    //createa fake message object 
    //@ts-ignore
    const msg:Message = {
        ack:jest.fn()
    }
    return {listener,data,msg,ticket}
}

it('finds, updates and saves a ticket', async () => {
    const {listener,ticket,msg,data} = await setup();

    await listener.onMessage(data,msg);
    
    const updatedTicket = await Ticket.findById(ticket.id)
    
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);

})

it('acks the message', async () => {
    const {listener,msg,data} = await setup();

    await listener.onMessage(data,msg);
    expect(msg.ack).toHaveBeenCalled();
})

it('does not call the ack if the event has a skipped version number ', async () => {
    const {listener,msg,data,ticket} = await setup();
    data.version = 10
    try {
        await listener.onMessage(data,msg);
    } catch (error) {
        
    }
    expect(msg.ack).not.toHaveBeenCalled();
})