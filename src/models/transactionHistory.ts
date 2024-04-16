import mongoose from "mongoose"
import AccountBalance from "./accountSchema";
const userSchema= new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    counterparty:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    phone:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'User',
    },
});


const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;