import mongoose from "mongoose"

const THistory= new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true,
    },
    description:{
        type:String,
        default:"Initiated"
    }
    
   
}, {timestamps:true},);


const TransactionHistory = mongoose.models.TransactionHistory || mongoose.model("TransactionHistory",THistory);

export default TransactionHistory;