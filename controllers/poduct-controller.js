const productModel = require('../models/book-model');

exports.createProduct = async (req, res) => {
    try {
        const { name, author, price, description, genre, rating } = req.body;

        if (!name || !author || !price || !description || !genre || !rating) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await productModel.create({ name, author, price, description, genre, rating, admin: req.user._id, image: req.files.map(file => file.path) });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}