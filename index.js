import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import CommonRoute from './routes/v1/common/index.js';
import PublicRoute from './routes/v1/public/index.js';
import SecureRoute from './routes/v1/secure/index.js';


import { isAdmin } from './middleware/secure/index.js';
import { isUserOrAdmin } from './middleware/common/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongodb connection url
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.usk5q3y.mongodb.net/`;

// Database name
const mongoDB_database_name = "BookstoreAssignment";

// mongoDB connection
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: mongoDB_database_name
})
    .then(() => {
        console.log('Mongoose/ MongoDB connection is ok.');
    })
    .catch((error) => {
        console.error('Error in mongoose connection. Error: ', error);
    });


//Welcome route
app.get('/', (req, res) => {
    return res.status(200).send('Welcome in Bookstore application!');
})

// All common routes
app.use('/v1/common', CommonRoute);

// All public routes
app.use('/v1/public', isUserOrAdmin, PublicRoute);

// All secure routes for admin
app.use('/v1/secure', isAdmin, SecureRoute);


//No route
app.all("*", (req, res) => {
    const route = req.params;
    return res.status(404).send(`No Route found in "${route[0]}" !`);
})


// listening app
app.listen(port, () => {
    console.log(`Bookstore application Server is running`);
})