import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import adminRoutes from './routes/adminRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) =>{
    console.log(err);
});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

app.listen(3000, () =>{
    console.log('Server listening on port 3000!');
});