import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import rideRoutes from './routes/ride.route.js'; 
import * as rabbitMq from './service/rabbit.js';

rabbitMq.connect();


// Load environment variables from .env file
dotenv.config({path: './.env'});

// Create an Express application
const app = express();

// connect to MongoDB
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middleware for logging requests
// app.use(morgan('dev'));

// Middleware for cookie parsing
app.use(cookieParser());

// Import and use the ride routes   
app.use('/ride', rideRoutes);

export default app;

