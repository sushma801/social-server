const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./GraphQl/typeDefs.js");

const { MONGODB } = require("./config.js");
const resolvers = require("./GraphQl/resolvers");

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });

// server.listen({ port: 5000 }).then((res) => {
//   console.log(`Server is running at ${res.url}`);
// });
