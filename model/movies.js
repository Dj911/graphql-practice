const mongoose = require('mongoose');
const db = require('../connection/dbMaster');

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    producer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Movies = db.model('Movie', movieSchema);
module.exports = { Movies, movieSchema };