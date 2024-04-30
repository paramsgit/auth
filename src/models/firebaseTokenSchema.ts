import mongoose from "mongoose"

const FirebaseTokenSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    token:{
        type:String,
        required:true
    },

    
   
}, {timestamps:true},);


const FirebaseToken = mongoose.models.FirebaseToken || mongoose.model("FirebaseToken",FirebaseTokenSchema);

export default FirebaseToken; 
