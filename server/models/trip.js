const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    startMonth: Number,
    startDay: Number,
    startYear: Number,
    tripName: String,
    dayLength: Number,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    legs: [{ type: Schema.Types.ObjectId, ref: 'Leg'}]
})

module.exports = mongoose.model('Trip', TripSchema);