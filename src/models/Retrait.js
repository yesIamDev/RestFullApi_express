const mongoose = require("mongoose");
const { Schema } = mongoose;

const retraitSchema = Schema({
  acount: { type: Schema.Types.ObjectId, ref: "Acount" },
  amount: Number,
});

module.exports = mongoose.model("Retrait", retraitSchema);
