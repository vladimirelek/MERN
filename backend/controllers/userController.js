const AppError = require("../utils/AppError");
const Email = require("../utils/Email");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/asyncCatch");
const Message = require("../models/messageModel");
const signToken = require("../utils/signToken");
exports.register = catchAsync(async (req, res, next) => {
  const existingUser = await Users.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError(408, "Ovaj korisnik vec postoji"));
  }

  await Users.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  const user = {
    to: req.body.email,
    from: "adminTeam@gmail.com",
    username: req.body.username,
  };
  const url = "blabla";
  new Email(user, url).sendWelcome();
  return res.status(201).json({
    status: "succesfull",
    message: "korisnik je unesen",
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email }).select(
    "+password"
  );
  const comparePassword = await user.comparePassword(
    req.body.password,
    user.password
  );

  if (user && comparePassword) {
    const token = signToken(user.id);

    const { password, ...userData } = user.toObject();
    return res.status(200).json({
      status: "succesfull",
      message: "Uspjesno ste se ulogovali",
      user: userData,
      token: token,
    });
  }
  return next(new AppError(401, "Kredencijali nisu ispravni"));
});
exports.contactAdmin = catchAsync(async (req, res, next) => {
  const user = req.body;
  if (user) {
    const data = {
      to: user.to,
      from: user.from,
      username: user.from,
      message: user.message,
    };
    console.log(data);
    new Email(data, "blabla").contactAdmin();
  } else return next(new AppError(400, "Poruka nije unesena"));

  return res.status(200).json({
    status: "successful",
    message: "Poruka je poslata administratoru",
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();
  if (!users) return next(new AppError(404, "Korisnici nisu pronadjeni"));
  return res.status(200).json({
    users: users,
    status: "successful",
  });
});
exports.getMessages = catchAsync(async (req, res, next) => {
  const roomId = req.query.roomId;
  if (!roomId) {
    return next(new AppError(400, "Room ID is required"));
  }
  const messages = await Message.find({ room: roomId });
  return res.status(200).json({
    messages: messages,
    status: "successful",
  });
});
