const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id:ID
        username:String
        email:String
    }

    type Trip {
        _id:ID
        startMonth:Int
        startDay:Int
        tripName:String
        dayLength:Int
        user:User
        description:String
    }

    type Leg {
        _id:ID
        startDay:Int
        endDay:Int
        activity:Activity
        comments:String
        rating:Int
    }

    type Activity {
        _id:ID
        type:String
        place:String
        rating:Int
        comments:String
        day:Int
    }

    input UserInput {
        username:String
        email:String
    }

    type Query {
        test:String
        allUsers:[User!]!
        findUserByEmail(email: String!):User
    }

    type Mutation {
        createUser(input:UserInput):User
    }
`;

module.exports = typeDefs;