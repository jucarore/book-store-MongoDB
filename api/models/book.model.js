let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    year: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    }
});

BookSchema.set('toObject', { retainKeyOrder : true });

module.exports = mongoose.model('Book', BookSchema);