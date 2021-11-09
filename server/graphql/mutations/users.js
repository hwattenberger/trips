const User = require('../../models/user');
const { UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const findUser = await User.findOne({username: args.input.username})
    if (findUser) {
        throw new UserInputError('User already exists');
    }

    const newUser = new User(args.input);
    console.log("test", newUser)
    newUser.password = await bcrypt.hash(newUser.password, 8);
    await newUser.save();
    
    return { value: jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: "1d"}) };
}


module.exports.login = async (root, args, context) => {
    const user = await User.findOne({username: args.input.username})

    if (!user) {
        throw new UserInputError('Invalid credentials');
    }
    const validPass = await bcrypt.compare(args.input.password, user.password);
    if (!validPass) throw new UserInputError('Invalid credentials');

    console.log("Logging In", args.input, user)
    return { value: jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1d"}) };
}