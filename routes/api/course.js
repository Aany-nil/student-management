const express = require("express");
const { createCourse, getAllCourse, updateCourse, deleteCourse } = require("../../controllers/courseController");
const { protect, requireAdmin, requireVerifiedEmail } = require("../../middlewares/authMiddleware");
const router = express.Router();


router.use(protect, requireAdmin, requireVerifiedEmail);

router.post("/createcourse", createCourse);
router.get("/getcourse", getAllCourse);
router.put("/update-course/:id", updateCourse);
router.delete("/course-delete/:id", deleteCourse);


module.exports = router;