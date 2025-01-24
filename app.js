const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRouter = require('./routes/user-router');
const productRouter = require('./routes/product-router');
const indexRouter = require('./routes/index-router');
const cors = require('cors');
const cloudinary = require('cloudinary');
dotenv.config();

const app = express();
app.use(cors());

const connectDB = require('./config/mongodb-connection');
connectDB();

// Configuration
cloudinary.config({
    cloud_name: 'dlpckneac',
    api_key: 'cloudinary_API_KEY',
    api_secret: 'cloudinary_API_SECRET'
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public/images/uploads')));

app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
