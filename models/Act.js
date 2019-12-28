const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    stage: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    url: {
        type: String,
        required: true
    }
});

module.exports = Act = mongoose.model('act', ActSchema);