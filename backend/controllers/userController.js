import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            isDriver: user.isDriver,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid phone number or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, phoneNumber, password, isDriver } = req.body;

    const userExists = await User.findOne({ phoneNumber });

    if (userExists) {
        // 400 bad request
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        phoneNumber,
        password,
        isDriver,
    });

    if (user) {
        // 201 something was created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            isDriver: user.isDriver,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            isDriver: user.isDriver,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.isAdmin = req.body.isAdmin;
        user.isDriver = req.body.isDriver;
        user.numCompanions = req.body.numCompanions || user.numCompanions;
        user.companions = req.body.companions || user.companions;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phoneNumber: updatedUser.phoneNumber,
            isAdmin: updatedUser.isAdmin,
            isDriver: updatedUser.isDriver,
            numCompanions: updatedUser.numCompanions,
            companions: updatedUser.companions,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
};
