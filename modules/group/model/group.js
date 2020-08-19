const mongoose = require("mongoose")
const Users = require('../../users/model/users');
const Schema = mongoose.Schema

const group = new Schema({
    title: {
        type: String,
        required: true,
    },
    members: [
        { type: Schema.Types.ObjectId, ref: 'Users' }
    ],
    duration: {
        type: String,
        required: true,
        unique: true
    },
    target_amount: {
        type: String,
        required: true,
    },
    payment_frequency: {
        type: String,
        required: true,
        unique: true
    },
    payment_cycle: {
        type: String,
    },
})

module.exports = mongoose.model("Group", group);
