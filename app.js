const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRouter = require('./routes/user-router');

dotenv.config();

const app = express();

const connectDB = require('./config/mongodb-connection');
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', userRouter);

// Error handling
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
