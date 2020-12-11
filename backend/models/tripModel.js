import mongoose from 'mongoose';
import packageSchema from './packageSchema.js';

const tripSchema = mongoose.Schema(
    {
        from: {
            city: { type: String, required: true },
            address: { type: String, required: true },
        },
        to: {
            city: { type: String, required: true },
            address: { type: String, required: true },
        },
        moveAt: {
            type: Date,
            required: true,
        },
        arriveAt: {
            type: Date,
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        numPassengers: {
            type: Number,
            required: true,
            default: 0,
        },
        passengers: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectID,
                    required: true,
                    ref: 'User',
                },
                numCompanions: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                companions: [
                    {
                        name: { type: String, required: false },
                        phoneNumber: { type: String, required: false },
                    },
                ],
            },
        ],
        packages: [packageSchema],
    },
    {
        timestamp: true,
    }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
