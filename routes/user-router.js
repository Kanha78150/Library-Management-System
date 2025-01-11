const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authMiddleware.authenticate, userController.logout);

// For getting the profile
router.get('/profile', authMiddleware.authenticate, userController.getProfile);



module.exports = router;