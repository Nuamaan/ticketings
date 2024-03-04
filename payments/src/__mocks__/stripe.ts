import mongoose from "mongoose";

export const stripe = {
    paymentIntents : {
        create: jest.fn().mockResolvedValue({id:new mongoose.Types.ObjectId().toHexString()})
    }    
}