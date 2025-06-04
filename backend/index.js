const errorController = require("./controllers/errorController");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const userRoutes = require("./routes/userRoutes");
const Email = require("./utils/Email");
const AppError = require("./utils/AppError");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.all("*", (req, res, next) => {
  next(new AppError(404, "Page does not exist"));
});
app.use(errorController);

module.exports = app;
