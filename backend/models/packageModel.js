import mongoose from 'mongoose';

const packageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User',
        },
        packageItems: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectID,
                    required: true,
                    auto: true,
                },
            },
        ],
        shippingAddress: {
            city: { type: String, required: true },
            address: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },
    },
    {
        timestamp: true,
    }
);

const Package = mongoose.model('Package', packageSchema);

export default Package;
