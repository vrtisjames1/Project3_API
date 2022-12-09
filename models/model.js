const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    country: String,
    majorCities: [{type: String}],
    photos: [{type: String}],
    date: String,
    recommend: {type: Boolean, default: true}
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;