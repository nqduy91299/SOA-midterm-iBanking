const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    phone: String,
    balance: Number,
    otp: String,
    expires: Date,
    transcurr: String,
});

let User = mongoose.model("User", userSchema, "Users");

module.exports = User;
	

