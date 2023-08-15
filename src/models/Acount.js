const mongoose = require('mongoose');

const acountSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    code : String,
    amount: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Acount',acountSchema);