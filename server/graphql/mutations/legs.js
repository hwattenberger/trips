const Leg = require('../../models/leg');
const { UserInputError } = require('apollo-server-express');

module.exports.createLeg = async (root, args) => {
    const newLeg = new Leg(args.input);
    if (args.input.userId) newTrip.user = args.input.userId;
    await newLeg.save();
    return newLeg;
}

module.exports.updateLeg = async (root, args) => {
    if (!args.input._id) throw new UserInputError('Must send id of leg to update', {
        invalidArgs: '_id'
    })

    try {
        const leg = await Leg.findByIdAndUpdate(args.input._id, args.input, {new: true, omitUndefined:true})
        return leg;
    }
    catch {
        throw new UserInputError('Unable to find leg with that id', {
            invalidArgs: '_id'
        })
    }
}