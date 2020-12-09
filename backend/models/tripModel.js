import mongoose from 'mongoose';

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
        passengers: [
            {
                name: { type: String, required: true },
                phoneNumber: { type: String, required: true },
            },
        ],
        packages: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Package',
                },
            },
        ],
    },
    {
        timestamp: true,
    }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
