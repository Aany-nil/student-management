const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const { protect, requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");

router.get("/users", adminController.getAllUsers);
router.patch("/approved/:id", adminController.approvedUserRole);
router.delete("/delete/:id", adminController.deleteUser)




module.exports = router;