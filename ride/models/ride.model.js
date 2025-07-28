import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    captain: { type: mongoose.Schema.Types.ObjectId, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    status: {
        type: String,
        enum: ['requested', 'accepted', "started", 'completed', 'cancelled'],
        default: 'requested',
        required: true
    }
});

const ride = mongoose.model('ride', rideSchema);

export default ride;