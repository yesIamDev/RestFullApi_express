const mongoose = require('mongoose');
const {Schema} = mongoose;

const depositSchema = Schema({
   acount: { type: Schema.Types.ObjectId, ref:'Acount' },
   amount: Number
})

module.exports = mongoose.model('Deposit', depositSchema);