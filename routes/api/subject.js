const express = require("express");
const router = express.Router();

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../../controllers/subjectController");

const {
  protect,
  requireAdmin,
} = require("../../middlewares/authMiddleware");

// All subject routes require authentication
router.use(protect);

// Get all subjects
router.get("/", getAllSubjects);

// Get a single subject by ID
router.get("/:subjectId", getSubjectById);

// Admin only routes
router.post("/", requireAdmin, createSubject);

router.patch("/:subjectId", requireAdmin, updateSubject);

router.delete("/:subjectId", requireAdmin, deleteSubject);

module.exports = router;