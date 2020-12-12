import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
// Need to have .js when importing files, not packages
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const PORT = process.env.PORT || 5000;

config();
connectDB();

app.get('/', (req, res) => {
    res.json('API is running...');
});

// Allows us to accept JSON data in the body
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/trips', tripRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
