import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
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