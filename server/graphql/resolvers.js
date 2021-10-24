const User = require('../models/user');

const resolvers = {
    Query: {
        test: () => "Hi",
        allUsers: async () => await User.find({}),
        findUserByEmail: async (root, args) => await User.findOne({email: args.email})
    },
    Mutation: {
        createUser: async (root, args) => {
            const newUser = new User(args.input);
            await newUser.save();
            return newUser;
        }
    }
};

module.exports = resolvers;