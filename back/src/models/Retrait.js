const mongoose = require('mongoose');

const retraitSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    isUSD: {
        type:Boolean,
        default:true,
        required:true
    }
})

module.exports = mongoose.model('Retrait', retraitSchema);