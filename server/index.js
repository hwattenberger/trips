if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/schema.js');
const User = require('./models/user');

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
    server = new ApolloServer({ typeDefs, resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser }
        }
    }});
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