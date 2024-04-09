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
    }
});


accountSchema.post('save', async function (doc) {
    console.log("this is runned in acc")
    try {
        // Create AccountBalance document for the newly created user
        await AccountBalance.create({
            userId: doc._id, // Using the _id of the newly created user
            balance: 500 // Initial balance set to 500
        });
    } catch (error) {
        console.error("Error creating AccountBalance:", error);
    }
});

const AccountBalance = mongoose.models.AccountBalance || mongoose.model("AccountBalance",accountSchema);

export default AccountBalance;