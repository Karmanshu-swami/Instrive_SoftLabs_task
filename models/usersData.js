const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: String,
    emailId: String,
    mobile: String,
    address1: String,
    country: String,
    status: String,
    err_log: String
});

module.exports = mongoose.model("UsersData", userModel);