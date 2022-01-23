const mongoose = require('mongoose');


const infoSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    city: {
        type: String,
        reqired: true,
        lowercase: true
    },
    rooms: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: String,
        required: true,
        lowercase: true
    },

    facilities: {
        type: [String],
        required: true
    },

    img1: {
        type: String,
        required: true,
        lowercase: true
    },
    img2: {
        type: String,
        required: true,
        lowercase: true
    }
});

const infos = mongoose.model('info', infoSchema);
module.exports = infos;