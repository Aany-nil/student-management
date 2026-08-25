const express = require("express");
const router = express.Router();
const { makePayment } = require("../../controllers/paymentController.js")

const {
  protect,
} = require("../../middlewares/authMiddleware");
const {requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");



router.use(protect, requireVerifiedEmail);


router.post("/checkout", makePayment);




module.exports = router;