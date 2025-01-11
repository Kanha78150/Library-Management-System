const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: [{
        type: String,
    }]
},
    {
        timestamps: true
    }
)

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
