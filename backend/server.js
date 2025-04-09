import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
import cors from 'cors';

import connectDB from './config/db.js';
import categoryRoutes from './routes/category.route.js';
import userRoutes from './routes/user.route.js';
import voteRoutes from './routes/vote.route.js';

// Load environment variables from the .env file
dotenv.config();

// Create an express application
const app = express();
const PORT = process.env.BACK_PORT || 5000;

app.use(cors());

// Allow the server to accept JSON data in the body of the request for parsing
app.use(express.json());

app.use('/api', categoryRoutes, userRoutes, voteRoutes);

app.listen(PORT, () => {
    connectDB(); // Connect to the database
    console.log('Server accessible on http://localhost:' + PORT + ' if you are on local machine');
    const networkInterfaces = os.networkInterfaces();
    const localIp = Object.values(networkInterfaces)
        .flat()
        .find((iface) => iface.family === 'IPv4' && !iface.internal).address;

    console.log(`Server accessible on http://${localIp}:${PORT} for devices on the same local network`);
});