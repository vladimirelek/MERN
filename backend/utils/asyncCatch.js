const AppError = require("../utils/AppError");
module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((el) => el.message);
        const message = messages.join(". ");
        return next(new AppError(400, message));
      }
      return next(new AppError(500, "Greska na serveru"));
    });
  };
};
