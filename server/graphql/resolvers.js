const User = require('../models/user');
const users = require('./mutations/users')
const Trip = require('../models/trip');
const trips = require('./mutations/trips')

const resolvers = {
    Query: {
        test: () => "Hi",
        allUsers: async () => await User.find({}),
        findUserByName: async (root, args) => await User.findOne({username: args.username}),
        allTrips: async () => await Trip.find({}).populate({path:'user'}),
        findTripsByUser: async (root, args) => await Trip.findOne({user: args.userId}),
        findTripById: async (root, args) => await Trip.findById(args._id).populate({path:'legs'}),
    },
    // Trip: {
    //     legs: (root) => {
    //         console.log("Hi2", root)
    //     }
    // },
    Mutation: {
        //users
        userCreate: users.createUser,
        userUpdate: users.updateUser,
        login: users.login,

        //trips
        tripCreate: trips.createTrip,
        tripUpdate: trips.updateTrip
    }
};

module.exports = resolvers;