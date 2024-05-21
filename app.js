// server.js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");
const connectDB = require("./db");
const userResolvers = require("./resolvers/users");
const hotelResolvers = require("./resolvers/hotels");
const merge = require("lodash.merge");

// Merge resolvers
const rootResolvers = merge({}, userResolvers, hotelResolvers);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: rootResolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
