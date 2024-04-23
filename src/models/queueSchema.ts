import mongoose from "mongoose"

const TQueue= new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: false
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    expiresAt: { type: Date, default: Date.now, index: { expires: '5m' } } // TTL index set to 1 minute

    
   
}, {timestamps:true},);


const TransactionQueue = mongoose.models.TransactionQueue || mongoose.model("TransactionQueue",TQueue);

export default TransactionQueue;