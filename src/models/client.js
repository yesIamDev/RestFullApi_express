const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {type:String, required: true},
    postname: {type:String, required: true},
    nationalite: {type: String, required: true}
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;