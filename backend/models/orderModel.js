import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: false,
            default: null,
        },
        userPhoneNumber: {
            type: String,
            required: false,
            default: null,
        },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: false,
            ref: 'User',
            default: null,
        },
        userIsPassenger: {
            type: Boolean,
            required: true,
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
        trip: {
            type: mongoose.Schema.Types.ObjectID,
            required: false,
            ref: 'Trip',
            default: null,
        },
    },
    {
        timestamp: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
