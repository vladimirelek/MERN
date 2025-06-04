const adminController = require("../controllers/adminController");
const authorization = require("../utils/authorizationValidation");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const router = express.Router();
router
  .route("/product/:_id?/:image?")
  .post(
    authorization.validate,
    upload.single("file"),
    adminController.addProduct
  )
  .delete(authorization.validate, adminController.deleteProduct)
  .put(
    authorization.validate,
    upload.single("file"),
    adminController.updateProduct
  );

router
  .route("/getComments")
  .get(authorization.validate, adminController.getComments);

router
  .route("/updateComment")
  .patch(authorization.validate, adminController.updateComment);

module.exports = router;
