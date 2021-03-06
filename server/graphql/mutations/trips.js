const Trip = require('../../models/trip');
const Leg = require('../../models/leg');
const Activity = require('../../models/activity')
const { UserInputError } = require('apollo-server-express');


module.exports.updateTrip = async (root, args) => {
    if (!args.input._id) throw new UserInputError('Must send id of trip to update', {
        invalidArgs: '_id'
    })

    try {
        const updatedTrip = {...args.input};
        const currentTrip = await Trip.findById(updatedTrip._id);

        currentTrip.legs.forEach((leg) => {
            const foundLeg = updatedTrip.legs.find((updLeg)=> {
                if (updLeg._id === leg._id.toString()) return 1;
            });
            if (!foundLeg) Leg.deleteOne({id: leg._id})
        })

        const updatedLegs = [];
        for (let leg of updatedTrip.legs) {
            const foundLeg = await Leg.findById(leg._id);
            if (foundLeg) { 
                await foundLeg.updateOne(leg);
                updatedLegs.push(leg);
            }
            else {
                const activities = [];

                for(let j=0; j<leg.activities.length; j++) {
                    const newActivity = new Activity(leg.activities[j]);
                    await newActivity.save();
                    activities.push(newActivity);
                }
                const newLeg = new Leg(leg);
                newLeg.activities = activities;
                await newLeg.save();
                updatedLegs.push(newLeg);
            }
        }
        updatedTrip.legs = updatedLegs;
        const trip = await Trip.findByIdAndUpdate(updatedTrip._id, updatedTrip, {new: true, omitUndefined:true})
        return trip;
    }
    catch {
        throw new UserInputError('Unable to find trip with that id', {
            invalidArgs: '_id'
        })
    }
}

module.exports.createTrip = async (root, args, context) => {
    const newLegs = [];
    for (let i = 0; i < args.input.legs.length; i++) {
        const activities = [];

        for(let j=0; j<args.input.legs[i].activities.length; j++) {
            const newActivity = new Activity(args.input.legs[i].activities[j]);
            await newActivity.save();
            activities.push(newActivity);
        }

        const newLeg = new Leg(args.input.legs[i]);
        newLeg.activities = activities;
        await newLeg.save();
        newLegs.push(newLeg);
    }
    const newTrip = new Trip(args.input);
    newTrip.legs = newLegs;
    newTrip.user = context.currentUser._id;

    if (args.input.userId) newTrip.user = args.input.userId;
    await newTrip.save();
    return newTrip;
}

module.exports.getTripLocations = async (root, args) => {
    const tripLocs = await Trip.aggregate([{
        $lookup: {
            from: "legs",
            localField: "legs",
            foreignField: "_id",
            as: "legs"
        }
    }, {
        $unwind: '$legs'
    }, {
        $project: {
            "_id": 1,
            "tripName": 1,
            location_coord: "$legs.location.center",
            location_name: "$legs.location.place_name"
        }
    }]);

    return tripLocs;
}