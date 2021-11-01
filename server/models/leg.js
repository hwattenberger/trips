const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LegSchema = new Schema({
    startDay: Number,
    endDay: Number,
    location: {
        place_name: String,
        center: [Number],
        mapboxId: String,
        bbox: [Number],
        countryShortCode: String
    },
    // accommodations: {
    //     type: String,
    //     name: String
    // },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    comments: String,
    rating: Number,
    travelAfter: {
        method: String,
        comments: String
    }
})

module.exports = mongoose.model('Leg', LegSchema);