import mongoose from "mongoose"
import AccountBalance from "./accountSchema";
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

// userSchema.post('save', async function () {
//     console.log('this is runned')
//     // Check if this is a new user
//     if (this.isNew) {
//       // Create a new AccountBalance instance with a balance of 500
//       const accountBalance = new AccountBalance({
//         userId: this._id, // Associate the new account balance with the user's ID
//         balance: 500
//       });
  
//       // Save the AccountBalance instance to the database
//       await accountBalance.save();
//     }
//   });

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;