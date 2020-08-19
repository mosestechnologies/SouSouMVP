const mongoose = require("mongoose");
const Group = require('../../group/model/group');
const Schema = mongoose.Schema;

const users = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
    },
    unique_id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
    },
    role: {
        type: String,
    },
})

module.exports = mongoose.model("Users", users);
