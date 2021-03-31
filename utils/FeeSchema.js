const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    username: String,
    name: String,
    feename: String,
    fee: Number,
    paid: Number,
})

let Fee = mongoose.model("Fee", feeSchema, "Fees")

module.exports = Fee