const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already registered"]
    },
    username: String
})

module.exports = mongoose.model('User', UserSchema);