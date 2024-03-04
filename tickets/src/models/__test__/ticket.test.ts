import { Ticket } from "../tickets"

it('implements optimistic concurrency control',async () => {
    // Create an instance of a ticket 
    const ticket = Ticket.build({
        title:'Concert',
        price:5,
        userId:'123'
    });
    //Save the ticket to the db 
    await ticket.save()
    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id)
    const secondInstance = await Ticket.findById(ticket.id)
    //make two separate changes to the ticket we fetched
    firstInstance!.set({price:10})
    secondInstance!.set({price:15})
    //save the first fetched ticket
    await firstInstance!.save()
    //save the second fetched ticket and expect an error
    try {
        await secondInstance!.save()
    } catch (error) {
        return   
    }
    throw new Error('Should not reach this point');
})

it('increments the version number on saving multiple times', async () => {
    const ticket = Ticket.build({
        title:'Concert',
        price:20,
        userId:'asdfasd'
    })

    await ticket.save()
    expect(ticket.version).toEqual(0)

    await ticket.save()
    expect(ticket.version).toEqual(1)

    await ticket.save()
    expect(ticket.version).toEqual(2)
})