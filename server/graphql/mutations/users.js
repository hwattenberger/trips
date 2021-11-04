const User = require('../../models/user');
const { UserInputError } = require('apollo-server-express');


module.exports.updateUser = async (root, args) => {
    if (!args.input._id) throw new UserInputError('Must send id of user to update', {
        invalidArgs: '_id'
    })

    try {
        const user = await User.findByIdAndUpdate(args.input._id, args.input, {new: true, omitUndefined:true})
        return user;
    }
    catch {
        throw new UserInputError('Unable to find user with that id', {
            invalidArgs: '_id'
        })
    }
}

module.exports.createUser = async (root, args) => {
    const newUser = new User(args.input);
    await newUser.save();
    return newUser;
}

module.exports.login = async (root, args) => {
    const newUser = new User(args.input);
    await newUser.save();
    return newUser;
}