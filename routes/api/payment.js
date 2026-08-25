const express = require("express");
const router = express.Router();
const { makePayment, paymentSuccess, paymentFail, paymentCancel } = require("../../controllers/paymentController.js")

const {
  protect,
} = require("../../middlewares/authMiddleware");
const {requireVerifiedEmail } = require("../../middlewares/authMiddleware.js");

router.post("/success", paymentSuccess);
router.get("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.get("/fail", paymentFail);
router.post("/cancel", paymentCancel);
router.get("/cancel", paymentCancel);



router.use(protect, requireVerifiedEmail);


router.post("/checkout", makePayment);




module.exports = router;