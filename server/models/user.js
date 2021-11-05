const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: [true, "username already registered"]
    },
    password: String
})

module.exports = mongoose.model('User', UserSchema);