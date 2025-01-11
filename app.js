const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRouter = require('./routes/user-router');
const productRouter = require('./routes/product-router');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());

const connectDB = require('./config/mongodb-connection');
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', userRouter);
app.use('/api', productRouter);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
