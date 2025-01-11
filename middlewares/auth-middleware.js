const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken-model');
const User = require('../models/user-model');

module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // check if token is provided
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isTokenBlacklisted = await BlacklistToken.findOne({ token });
        // check if token is blacklisted
        if (isTokenBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // check if user exists
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        next(error);
    }
}
