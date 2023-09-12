const mongoose = require('mongoose');
const {Schema} = mongoose;

const acountSchema = Schema({
    client: { type: Schema.Types.ObjectId, ref:'Client'},
    acountNumber: String,
    usdSold: {
        type: Number,
        default: 0
    },
    fcSold: {
        type: Number,
        default: 0
    }
})

const Acount = mongoose.model('Acount', acountSchema);

module.exports = Acount;