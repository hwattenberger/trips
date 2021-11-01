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
        legs: [Leg]
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
        travelAfter: TravelAfter
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
        place_name: String
        center: [Float]
        mapboxId: String
        bbox: [Float]
        countryShortCode: String
    }

    type Accommodations {
        type: String
        name: String
    }

    type TravelAfter {
        method: String
        comments: String
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
        legs: [LegInput]
    }

    input LegInput {
        _id: ID
        startDay: Int
        endDay: Int
        location: LocationInput
        # accommodations: AccommodationInput
        activities: ActivityInput
        comments: String
        rating: Int
        travelAfter: TravelAfterInput
    }

    input TravelAfterInput {
        method: String
        comments: String
    }

    input AccommodationInput {
        type: String
        name: String
    }

    input LocationInput {
        place_name: String
        center: [Float]
        mapboxId: String
        bbox: [Float]
        countryShortCode: String
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
        findTripsByUser(userId: String!): [Trip!]!
        findTripById(_id: String!): Trip!
    }

    type Mutation {
        userCreate(input: UserInput): User
        userUpdate(input: UserInput): User
        tripCreate(input: TripInput): Trip
        tripUpdate(input: TripInput): Trip
    }
`;

module.exports = typeDefs;