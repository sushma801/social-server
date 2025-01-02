const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  // context = {...headers}
  const authHeader = context.req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    //
    const token = authHeader;
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid/expired Token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authentication header must be provided");
};
