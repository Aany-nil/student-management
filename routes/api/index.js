const express = require("express");
const router = express.Router();

const auth = require("./auth.js");
const admin = require("./admin.js");
const subject = require("./subject.js");
const Class = require("./class.js");
const notice =  require("./notice.js");
const payment = require("./payment.js");
const course = require("./course.js");



router.use("/auth", auth);
router.use("/admin", admin);
router.use("/subject", subject);
router.use("/class", Class);
router.use("/notice", notice);
router.use("/payment", payment);
router.use("/course", course);



module.exports = router;