import mongoose from "mongoose"

const accountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    pin:{
        type:String,
        required:true
    }
});




const AccountBalance = mongoose.models.AccountBalance || mongoose.model("AccountBalance",accountSchema);

export default AccountBalance;