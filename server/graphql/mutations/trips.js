const Trip = require('../../models/trip');
const Leg = require('../../models/leg');
const { UserInputError } = require('apollo-server-express');


module.exports.updateTrip = async (root, args) => {
    if (!args.input._id) throw new UserInputError('Must send id of trip to update', {
        invalidArgs: '_id'
    })

    try {
        const trip = await Trip.findByIdAndUpdate(args.input._id, args.input, {new: true, omitUndefined:true})
        return trip;
    }
    catch {
        throw new UserInputError('Unable to find trip with that id', {
            invalidArgs: '_id'
        })
    }
}

module.exports.createTrip = async (root, args) => {
    const newLegs = [];
    for (let i = 0; i < args.input.legs.length; i++) {
        const newLeg = new Leg(args.input.legs[i]);
        // await newLeg.save();
        newLegs.push(newLeg);
    }
    const newTrip = new Trip(args.input);
    newTrip.legs = newLegs;

    if (args.input.userId) newTrip.user = args.input.userId;
    // await newTrip.save();
    console.log("New Trip", newTrip)
    return newTrip;
}

module.exports.createTripOld = async (root, args) => {
    const newLegs = [];
    for (let i = 0; i < args.input.legs.length; i++) {
        const newLeg = new Leg(args.input.legs[i]);
        await newLeg.save();
        newLegs.push(newLeg);
    }
    const newTrip = new Trip(args.input);
    newTrip.legs = newLegs;

    if (args.input.userId) newTrip.user = args.input.userId;
    await newTrip.save();

    return newTrip;
}