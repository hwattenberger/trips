const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    type: String,
    place: String,
    rating: Number,
    comments: String,
    day: Number
})

module.exports = mongoose.model('Activity', ActivitySchema);