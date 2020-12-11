import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User',
        },
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
    },
    {
        timestamp: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
