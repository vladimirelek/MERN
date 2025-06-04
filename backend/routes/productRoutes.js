const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
router.route("/getAllProducts").get(productController.getAllProducts);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.rateItem);
module.exports = router;
