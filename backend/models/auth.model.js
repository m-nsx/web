import mongoose from "mongoose";

// Define the schema for the cards collection
// List attributes for the cards collection
const userSchema = new mongoose.Schema({
    // name of the card (because the name are unique, we can use it as the "primary key")
    username: {
        type: String,
        required: true
    },
    // type of the card
    hpassword: {
        type: String,
        required: true
    },
    // cost of the card
    account: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Create a model for the cards collection
// Specify that mongoose should create a collection called 'cards' in the database using cardSchema schem
const Card = mongoose.model('User', userSchema);

// Export the model for external use
export default Card;