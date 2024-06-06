const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String

});


const User = mongoose.model('users', userSchema);
module.exports = User;