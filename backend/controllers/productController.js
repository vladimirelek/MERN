const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
exports.getAllProducts = asyncCatch(async (req, res, next) => {
  const { page, limit, category, minPrice, maxPrice, search } = req.query;
  const queryObj = {};
  let products, totalProducts;
  if (category) {
    queryObj.category = category;
  }
  if (minPrice || maxPrice) {
    queryObj.price = {};
    if (minPrice) {
      queryObj.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      queryObj.price.$lte = Number(maxPrice);
    }
  }
  if (search) {
    queryObj.title = { $regex: search, $options: "i" };
  }
  const skip = (page - 1) * limit;
  totalProducts = (await Product.find(queryObj)).length;
  products = await Product.find(queryObj).skip(skip).limit(Number(limit));
  if (products) {
    res.status(200).json({
      status: "succesfull",
      products: products,
      totalProducts: totalProducts,
    });
  } else {
    return next(new AppError(404, "Ne postoji nijedan prozivod"));
  }
});
exports.getSingleProduct = asyncCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const { __v, ...productData } = product.toObject();
    return res.status(200).json({
      status: "succesfull",
      product: productData,
    });
  } else {
    return next(new AppError(404, "Proizvod nije pronadjen"));
  }
});
exports.rateItem = asyncCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const { star, userId } = req.body;

  if (!product) return next(new AppError(404, "Ovakav proizvod ne postoji"));
  const existingRatingIndex = product.allRatings.findIndex(
    (r) => r.user.toString() === userId.toString()
  );

  if (existingRatingIndex > -1) {
    // Korisnik već ocijenio – zamijeni ocjenu
    product.allRatings[existingRatingIndex].star = star;
  } else {
    // Novi korisnik – dodaj novu ocjenu
    product.allRatings.push({ user: userId, star });
  }
  const averageStar =
    product.allRatings.reduce((sum, rating) => sum + rating.star, 0) /
    product.allRatings.length;
  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    { rating: averageStar },
    { new: true }
  );
  if (!updatedProduct) {
    return next(new AppError(404, "Proizvod nije pronađen"));
  }

  await product.save();

  res.status(200).json({
    status: "successful",
    message: "Proizvod je ocijenjen",
  });
});
