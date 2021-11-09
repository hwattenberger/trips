const User = require('../models/user');
const users = require('./mutations/users')
const Trip = require('../models/trip');
const trips = require('./mutations/trips')

const resolvers = {
    Query: {
        test: () => "Hi",
        allUsers: async () => await User.find({}),
        findUserByName: async (root, args) => await User.findOne({username: args.username}),
        checkToken: async (root, args, context) => {
            if (context.currentUser && context.currentUser._id) return {hasToken: true};
            return {hasToken: false};
        },
        allTrips: async () => await Trip.find({}).populate({path:'user'}),
        findMyTrips: async (root, args, context) => {
            return Trip.find({user: context.currentUser._id})
        },
        findTripsByUser: async (root, args) => {
            await Trip.find({user: args.userId})
        },
        findTripById: async (root, args) => {
            const trip = await Trip.findById(args._id).populate({
                path: 'legs',
                populate: {
                    path: 'activities'
                }
            })
            return trip;
        },
        findFeaturedTrips: async (root, args) => {
            return Trip.find({isFeatured: true}).limit(5);
        },
    },
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