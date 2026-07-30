const express = require("express");
const router = express.Router();
const subjectController = require("../../controllers/subjectController.js");
const classController = require("../../controllers/classController.js");

const {
  protect,
  requireAdmin,
} = require("../../middlewares/authMiddleware");
const {requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");



router.use(protect, requireAdmin, requireVerifiedEmail);


router.post("/create", classController.createClass);
router.get("/allclasses", classController.getAllClasses);
router.patch("/update-class/:id", classController.updateClass);
router.delete("/delete/:id", classController.deleteClass);


module.exports = router;