const express = require("express");
const commentsController = require("../controllers/commentsController");
const router = express.Router();
router.route("/addComment").post(commentsController.addComment);
router.route("/getComments/:id").get(commentsController.getComments);
module.exports = router;
