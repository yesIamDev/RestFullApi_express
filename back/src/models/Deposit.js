const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    clientId: {
        type: String,
        required: true
    },
    isUSD: {
        type:Boolean,
        default:true,
        required:true
    }
})

module.exports = mongoose.model('Deposit', depositSchema);