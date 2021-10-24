const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LegSchema = new Schema({
    startDay: Number,
    endDay: Number,
    location: {
        country: {
            number: Number,
            name: String
        },
        city: String,
        place: String,
        lat: Number,
        long: Number
    },
    accommodations: {
        type: String,
        name: String
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    comments: String,
    rating: Number
})

module.exports = mongoose.model('Leg', LegSchema);