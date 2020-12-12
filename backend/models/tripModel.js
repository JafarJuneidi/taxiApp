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
            type: String,
            required: true,
        },
        arriveAt: {
            type: String,
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
            default: null,
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
                    required: false,
                    ref: 'User',
                    default: null,
                },
                headUserName: {
                    type: String,
                    required: false,
                    default: null,
                },
                headUserPhoneNumber: {
                    type: String,
                    required: false,
                    default: null,
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
