const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    parent: String,
    confirm: {type: Boolean, default: false},
    kid: String,
    photo: String,
    status: [{date: String, header: String, comments: String}],
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;