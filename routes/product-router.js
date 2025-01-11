const upload = require('../multer-setup');
const authMiddleware = require('../middlewares/auth-middleware');
const productController = require('../controllers/poduct-controller');


const express = require('express');
const router = express.Router();

router.use(authMiddleware.authenticate).use(authMiddleware.isAdmin);

router.post('/product-create', upload.any(), productController.createProduct);

module.exports = router;