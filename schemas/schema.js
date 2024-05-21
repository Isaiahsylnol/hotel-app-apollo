// schema.js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const User = require("../models/userModel");

const { getUsers, getUserByName, addUser } = require("../resolvers/users");
const { searchByCity } = require("../resolvers/hotels");

// Define User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const HotelType = new GraphQLObjectType({
  name: "Hotel",
  fields: () => ({
    name: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    searchCity: {
      type: HotelType,
      args: { city: { type: GraphQLString } },
      resolve: searchByCity,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: getUsers,
    },
    findByName: {
      type: UserType,
      args: { name: { type: GraphQLString } },
      resolve: getUserByName,
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          age: args.age,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
