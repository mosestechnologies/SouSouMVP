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
    duration: {//1 year
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    target_amount: {//$1200 in total
        type: String,
        required: true,
        trim: true
    },
    payment_frequency: { //$100 per month
        type: String,
        required: true,
        trim: true
    },
    payment_cycle: { //each month
        type: String,
        trim: true
    },
    members_limit: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Group", group);
