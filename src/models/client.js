const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    postname: {
        required: true,
        type: String
    },
    age: {
        type: Number
    },
    ville: {
        type: String,
        required: true
    },
    pays:{
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('Data', clientSchema);