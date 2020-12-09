// Seperate, not connected to server

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import packages from './data/packages.js';
import User from './models/userModel.js';
import Package from './models/packageModel.js';
import Trip from './models/tripModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Package.deleteMany();
        await Trip.deleteMany();
        await User.deleteMany();

        const insertedUsers = await User.insertMany(users);
        const packageSender = insertedUsers[0]._id;

        const samplePackages = { ...packages[0], user: packageSender };

        await Package.insertMany(samplePackages);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Package.deleteMany();
        await Trip.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
