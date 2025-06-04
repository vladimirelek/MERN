const express = require("express");
const userController = require("../controllers/userController");
const app = express();
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/contactAdmin").post(userController.contactAdmin);
router.route("/getAllUsers").get(userController.getAllUsers);
router.route("/getMessages").get(userController.getMessages);
module.exports = router;
