import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
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

// Mounting the userRoutes on '/api/user'
app.use('/api/user', userRoutes);

app.listen(3000, () =>{
    console.log('Server listening on port 3000!');
});