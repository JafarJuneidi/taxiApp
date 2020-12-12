import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Trip from '../models/tripModel.js';

// @desc    creates a trip
// @route   POST /api/trips
// @access  Private/Admin
const createTrip = expressAsyncHandler(async (req, res) => {
    const {
        from,
        to,
        moveAt,
        arriveAt,
        driver,
        numPassengers,
        passengers,
        packages,
    } = req.body;

    const trip = new Trip({
        from,
        to,
        moveAt,
        arriveAt,
        driver: mongoose.Types.ObjectId(driver),
        numPassengers,
        passengers: passengers.map((passenger) => ({
            ...passenger,
            user: mongoose.Types.ObjectId(passenger.user),
        })),
        packages,
    });

    const createdTrip = await trip.save();

    if (trip) {
        res.status(201).json(createdTrip);
    } else {
        res.status(400);
        throw new Error('Invalid trip data');
    }
});

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private/Admin
const getAllTrips = expressAsyncHandler(async (req, res) => {
    const trips = await Trip.find({});

    if (trips) {
        res.json(trips);
    } else {
        res.status(404);
        throw new Error('No trips found');
    }
});

// @desc    update a trip
// @route   GET /api/trips/:id
// @access  Private/Admin
const updateTrip = expressAsyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
        trip.from = req.body.from || trip.from;
        trip.to = req.body.to || trip.to;
        trip.moveAt = req.body.moveAt || trip.moveAt;
        trip.arriveAt = req.body.arriveAt || trip.arriveAt;
        trip.driver = mongoose.Types.ObjectId(req.body.driver) || trip.driver;
        trip.numPassengers = req.body.numPassengers || trip.numPassengers;
        trip.passengers =
            req.body.passengers.map((passenger) => ({
                ...passenger,
                user: mongoose.Types.ObjectId(passenger.user),
            })) || trip.passengers;
        trip.packages = req.body.packages || trip.packages;

        const updatedTrip = await trip.save();

        res.json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Delete trip by Id
// @route   DELETE /api/trips/:id
// @access  Private/Admin
const deleteTripById = expressAsyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
        await trip.remove();
        res.json({ message: 'Trip removed' });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

export { createTrip, getAllTrips, updateTrip, deleteTripById };
