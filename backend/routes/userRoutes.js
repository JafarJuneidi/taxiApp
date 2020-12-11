import express from 'express';
const router = express.Router();
import {
    authUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    getUserProfile,
    registerUser,
    updateUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router
    .route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUserById);

export default router;
