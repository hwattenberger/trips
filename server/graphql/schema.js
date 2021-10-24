const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Trip {
        _id: ID
        startMonth: Int
        startDay: Int
        startYear: Int
        tripName: String
        dayLength: Int
        user: User
        description: String
    }

    type Leg {
        _id: ID
        startDay: Int
        endDay: Int
        location: Location
        accommodations: Accommodations
        activity: Activity
        comments: String
        rating: Int
    }

    type Activity {
        _id: ID
        type: String
        place: String
        rating: Int
        comments: String
        day: Int
    }

    type Location {
        country: Country
        city: String
        place: String
        lat: Float
        long: Float
    }

    type Country {
        number: Int
        name: String
    }

    type Accommodations {
        type: String
        name: String
    }

    input UserInput {
        _id: ID
        username: String
        email: String
    }

    input TripInput {
        _id: ID
        startMonth: Int!
        startDay: Int!
        startYear: Int!
        tripName: String!
        dayLength: Int
        userId: String
        description: String
    }

    input LegInput {
        _id: ID
        startDay: Int
        endDay: Int
        location: LocationInput
        accommodations: AccommodationInput
        activity: ActivityInput
        comments: String
        rating: Int
    }

    input AccommodationInput {
        type: String
        name: String
    }

    input LocationInput {
        country: CountryInput
        city: String
        place: String
        lat: Float
        long: Float
    }

    input CountryInput {
        number: Int
        name: String
    }

    input ActivityInput {
        _id: ID
        type: String
        place: String
        rating: Int
        comments: String
        day: Int
    }

    type Query {
        test: String
        allUsers: [User!]!
        findUserByEmail(email: String!): User
        allTrips: [Trip!]!
        findTripsByUser: [Trip!]!
    }

    type Mutation {
        userCreate(input: UserInput): User
        userUpdate(input: UserInput): User
        tripCreate(input: TripInput): Trip
        tripUpdate(input: TripInput): Trip
    }
`;

module.exports = typeDefs;