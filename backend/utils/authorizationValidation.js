const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const asyncCatch = require("../utils/asyncCatch");

const AppError = require("./AppError");
exports.validate = asyncCatch(async (req, res, next) => {
  let token;
  let decoded;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) return next(new AppError(401, "Niste ulogovani"));

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) return next(new AppError("Netacan ili istekao token"));
    else decoded = data;
  });
  const user = await Users.findById(decoded._id);
  req.user = user;
  next();
});
