import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import mongoose from 'mongoose';

// @desc    creates an order
// @route   POST /api/orders
// @access  Private
const createOrderLoggedIn = expressAsyncHandler(async (req, res) => {
    const {
        userIsPassenger,
        numCompanions,
        companions,
        from,
        to,
        moveAt,
        arriveAt,
    } = req.body;

    const order = new Order({
        user: req.user._id,
        userIsPassenger,
        numCompanions,
        companions,
        from,
        to,
        moveAt,
        arriveAt,
    });

    const createdOrder = await order.save();

    if (order) {
        res.status(201).json(createdOrder);
    } else {
        res.status(400);
        throw new Error('Invalid order data');
    }
});

// @desc    creates an order
// @route   POST /api/orders/guest
// @access  public
const createOrderGuest = expressAsyncHandler(async (req, res) => {
    const {
        userName,
        userPhoneNumber,
        userIsPassenger,
        numCompanions,
        companions,
        from,
        to,
        moveAt,
        arriveAt,
    } = req.body;

    const order = new Order({
        userName,
        userPhoneNumber,
        userIsPassenger,
        numCompanions,
        companions,
        from,
        to,
        moveAt,
        arriveAt,
    });

    const createdOrder = await order.save();

    if (order) {
        res.status(201).json(createdOrder);
    } else {
        res.status(400);
        throw new Error('Invalid order data');
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});

    if (orders) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
});

// @desc    update an order
// @route   GET /api/orders/:id
// @access  Private
const updateOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.userName = req.body.userName || order.userName;
        order.userPhoneNumber =
            req.body.userPhoneNumber || order.userPhoneNumber;
        order.numCompanions = req.body.numCompanions || order.numCompanions;
        order.companions = req.body.companions || order.companions;
        order.from = req.body.from || order.from;
        order.to = req.body.to || order.to;
        order.moveAt = req.body.moveAt || order.moveAt;
        order.arriveAt = req.body.arriveAt || order.arriveAt;
        order.userIsPassenger = req.body.userIsPassenger;
        order.trip = mongoose.Types.ObjectId(req.body.trip) || trip.trip;

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Delete order by Id
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.remove();
        res.json({ message: 'Order removed' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    createOrderLoggedIn,
    createOrderGuest,
    getAllOrders,
    deleteOrderById,
    updateOrder,
};
