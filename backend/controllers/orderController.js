import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    creates an order
// @route   POST /api/orders
// @access  Private
const createOrderLoggedIn = expressAsyncHandler(async (req, res) => {
    const { numCompanions, companions, from, to, moveAt, arriveAt } = req.body;

    const order = new Order({
        user: req.user._id,
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

export { createOrderLoggedIn, createOrderGuest, getAllOrders, deleteOrderById };
