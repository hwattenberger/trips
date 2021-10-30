if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/schema.js');

const port = process.env.PORT || 5000;

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/trips';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Database connected"));

let server;

const app = express();

//IIFE because there's an issue with apollo-server where you have to await server.start();
(async function startApolloServer() {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
})();

app.use(cors());

app.get('/', (req, res) => {
    console.log("GraphQL server is ready");
});

app.listen({ port: port }, () => {
    console.log(`Server is running at ${port}`);
});