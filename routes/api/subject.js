const express = require("express");
const router = express.Router();
const subjectController = require("../../controllers/subjectController.js");

const {
  protect,
  requireAdmin,
} = require("../../middlewares/authMiddleware");
const {requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");



router.use(protect, requireAdmin, requireVerifiedEmail);


router.post("/create", subjectController.createSubject);
router.get("/allsubject", subjectController.getAllSubject);
router.put("/update-subject/:id", subjectController.updateSubject);
router.delete("/delete/:id", subjectController.deleteSubject);



module.exports = router;