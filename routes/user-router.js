const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authMiddleware.authenticate, userController.logout);
router.get('/profile', authMiddleware.authenticate, userController.getProfile);

// For all products
router.get('/products', authMiddleware.authenticate, userController.getProducts);

// For a specific product
router.get('/products/:id', authMiddleware.authenticate, userController.getProductById);

module.exports = router;