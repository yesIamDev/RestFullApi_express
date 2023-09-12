const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    postname: String,
    age: Number,
    nationalite: String,
    acount: { type: Schema.Types.ObjectId, ref:'Acount' }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;