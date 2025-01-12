const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken-model');
const User = require('../models/user-model');

module.exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        // Check if token is blacklisted
        const isTokenBlacklisted = await BlacklistToken.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: 'Malformed JWT' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            throw error;
        }

        // Check if user exists
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
