import express from 'express';
import {
    createOrderLoggedIn,
    createOrderGuest,
    deleteOrderById,
    getAllOrders,
} from '../controllers/orderController.js';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router
    .route('/')
    .post(protect, createOrderLoggedIn)
    .get(protect, isAdmin, getAllOrders);

router.route('/guest').post(createOrderGuest);

router.route('/:id').delete(protect, isAdmin, deleteOrderById);

export default router;
