const path = require("path");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
const Comment = require("../models/commentModel");
const fs = require("fs");
exports.addProduct = asyncCatch(async (req, res, next) => {
  const productData = JSON.parse(req.body.data);
  const file = req.file;

  if (file) {
    productData.image = file.filename;
  } else {
    return new AppError(404, "Slika proizvoda je obavezna");
  }
  const newProduct = new Product(productData);
  await newProduct.save();
  res.status(200).json({
    status: "succesfull",
    message: "Prozvod uspjesno dodat",
    product: newProduct,
  });
});
exports.deleteProduct = asyncCatch(async (req, res, next) => {
  const data = await Product.deleteOne({ _id: req.params._id });
  console.log(data);
  if (data.acknowledged && data.deletedCount === 1) {
    const imagePath = path.join(__dirname, "..", "uploads", req.params.image);
    fs.unlink(imagePath, (err) => {
      if (err) return next(new AppError(404, "Slika nije obrisana"));
    });
    return res.status(200).json({
      status: "successful",
      message: "Proizvod je uspjesno obrisan",
    });
  } else {
    return next(new AppError(404, "Ovakav proizvod ne postoji"));
  }
});
exports.getComments = asyncCatch(async (req, res, next) => {
  const allComments = await Comment.find({});
  if (allComments.length > 0) {
    return res.status(200).json({
      status: "successful",
      comments: allComments,
    });
  } else {
    return next(new AppError(404, "Trenutno nema komentara"));
  }
});
exports.updateComment = asyncCatch(async (req, res, next) => {
  const { id, newStatus } = req.body;
  console.log(req.body);
  if (!id || typeof newStatus !== "boolean") {
    return next(new AppError(400, "ID i status su obavezni"));
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { status: newStatus },
    { new: true }
  );

  if (!updatedComment) {
    return next(new AppError(404, "Komentari nisu pronađen"));
  }

  res.status(200).json({
    status: "successful",
    message: "Status komentara  ažuriran",
  });
});
exports.updateProduct = asyncCatch(async (req, res, next) => {
  const productData = req.body.product
    ? JSON.parse(req.body.product)
    : req.body;
  const product = await Product.findById(productData.id);
  if (!product) return next(new AppError(404, "Ovakav proizvod ne postoi"));
  if (req.file) {
    if (product.image) {
      const oldImagePath = path.join(__dirname, "..", "uploads", product.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      productData.image = req.file.filename;
    }
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    productData.id,
    productData,
    { new: true }
  );

  if (!updatedProduct) {
    return next(new AppError(404, "Proizvod nije pronađen"));
  }

  res.status(200).json({
    status: "successful",
    message: "Proizvod je azuriran",
  });
});
