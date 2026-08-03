const express = require("express");
const router = express.Router();
const noticeController = require("../../controllers/noticeController.js");
const upload = require("../../middlewares/noticeUpload.js");

const {
  protect,
  requireRole,
} = require("../../middlewares/authMiddleware");
const {requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");


router.use(protect,requireVerifiedEmail);

router.post("/create", requireRole("admin", "teacher"), upload.single("image"),  noticeController.createNotice);
router.get("/allnotice", noticeController.getAllNotice);
router.put("/noticeupdate/:id", requireRole("admin", "teacher"), upload.single("image"), noticeController.noticeUpdate);


module.exports = router;