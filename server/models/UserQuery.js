import mongoose from 'mongoose';

const UserQuerySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming you have a User model
    },
    foodItem1: String,
    foodItem2: String,
    analysisResult: String
});

const UserQuery = mongoose.model('UserQuery', UserQuerySchema);

export { UserQuery };
