const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: String,
        age: Number,
        email: String,
        phone_number: String,
        state_id: Number,
        district: String,
        district_id: Number,
        notifications: Boolean
    }
)

module.exports = mongoose.model('User',UserSchema);