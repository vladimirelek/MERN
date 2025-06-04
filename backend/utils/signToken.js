const jwt = require("jsonwebtoken");
module.exports = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "90d",
  });
};
