import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';   
import morgan from 'morgan';
import dbConnect from './utils/index.js';
import { errorHandler, routeNotFound } from './middlewares/errorMiddlewares.js';
import routes from './routes/index.js';

dotenv.config();

dbConnect();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)


app.use('/api', routes)

app.use(routeNotFound);
app.use(errorHandler);


// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});