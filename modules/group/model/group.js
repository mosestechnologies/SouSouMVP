const mongoose = require("mongoose")
const Users = require('../../users/model/users');
const Schema = mongoose.Schema

const group = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    members: [
        { type: Schema.Types.ObjectId, ref: 'Users' }
    ],
    created_by: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    target_amount: {
        type: String,
        required: true,
        trim: true
    },
    payment_frequency: {
        type: String,
        required: true,
        trim: true
    },
    payment_cycle: {
        type: String,
        trim: true
    },
})

module.exports = mongoose.model("Group", group);
