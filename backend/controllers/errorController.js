const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    err: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err, "nepoznata greska");
    res.status(500).json({
      status: "error",
      message: "greska na serveru",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrProd(err, res);
  }
};
