const express = require("express");
const { createCourse, getAllCourse, updateCourse } = require("../../controllers/courseController");
const { protect, requireAdmin, requireVerifiedEmail } = require("../../middlewares/authMiddleware");
const router = express.Router();


router.use(protect, requireAdmin, requireVerifiedEmail);

router.post("/createcourse", createCourse);
router.get("/getcourse", getAllCourse);
router.put("/update-course/:id", updateCourse);


module.exports = router;