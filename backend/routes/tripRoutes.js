import express from 'express';
import {
    createTrip,
    deleteTripById,
    getAllTrips,
    updateTrip,
} from '../controllers/tripController.js';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router
    .route('/')
    .post(protect, isAdmin, createTrip)
    .get(protect, isAdmin, getAllTrips);

router
    .route('/:id')
    .put(protect, isAdmin, updateTrip)
    .delete(protect, isAdmin, deleteTripById);

export default router;
