import mongoose from "mongoose"

const TQueue= new mongoose.Schema({
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