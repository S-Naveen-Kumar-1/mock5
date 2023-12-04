const mongoose = require("mongoose")
const userschema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    label: String,
    booked_slots: Array
},
    {
        versionKey: false
    })
const UserModel = mongoose.model("user", userschema)
module.exports = { UserModel }