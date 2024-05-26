import mongoose from 'mongoose';

const UserQuerySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true // Ensure userId is required
    },
    foodItem1: { type: String, required: true },
    foodItem2: { type: String, required: true },
    analysisResult: { 
        type: Object, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now }
});

const UserQuery = mongoose.model('UserQuery', UserQuerySchema);

export { UserQuery };
