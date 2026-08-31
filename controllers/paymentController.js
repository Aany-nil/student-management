
const SSLCommerzPayment = require('sslcommerz-lts');
const Course = require("../models/Course");
const Payment = require('../models/Payment');
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = JSON.parse(process.env.IS_LIVE === "true");

const frontendUrl = process.env.FRONTEND_URL;
const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 8000}`;
const apiBaseUrl = process.env.BASE_URL || "/api/v1";


const makePayment = async (req, res) => {
    try {
        const { courseId, amount } = req.body;
        const userId = req.user._id;

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
              success: false,
              message: "course not found",  
            });
        }

        await Payment.create({
            userId,
            courseId,
            tran_id,
            amount: amount || course.credit || 100,
            status: "pending"
        });

        const data = {
           total_amount: amount || 100,
           currency: 'BDT',
           tran_id: 'REF123', // use unique tran_id for each api call
           success_url: `${backendUrl}${apiBaseUrl}/payment/success`,
           fail_url: `${backendUrl}${apiBaseUrl}/payment/fail`,
           cancel_url:`${backendUrl}${apiBaseUrl}/payment/cancel`,
           ipn_url: `${backendUrl}${apiBaseUrl}/payment/ipn`,
           shipping_method: 'No',
           product_name: 'course.title',
           product_category: 'Education',
           product_profile: 'general',
           cus_name: req.user.name || 'Customer Name',
           cus_email: req.user.email,
           cus_add1: 'Dhaka',
           cus_add2: 'Dhaka',
           cus_city: 'Bangladesh',
           cus_state: 'Dhaka',
           cus_postcode: '1000',
           cus_country: 'Bangladesh',
           cus_phone: req.user.phone || '01711111111',
           cus_fax: '01711111111',
           ship_name: 'Customer Name',
           ship_add1: 'Dhaka',
           ship_add2: 'Dhaka',
           ship_city: 'Dhaka',
           ship_state: 'Dhaka',
           ship_postcode: 1000,
           ship_country: 'Bangladesh',
       };

       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
       const apiResponse = await sslcz.init(data);

       if (apiResponse?.GatewayPageURL) {
        return res.status(200).json({ 
            success: true, 
            url: apiResponse.GatewayPageURL 
        });
       } else {
        return res.status(400).json({ 
            success: false, 
            message: "Payment initialization failed" });
      }
   
    } catch (error) {
       res.status(500).json({ 
        success: false, 
        message: error.message 
    });
      }
   };

const redirectToFronted = (path) => (req, res) => {
    res.redirect(303, `${frontendUrl}${path}`);
}

const paymentSuccess = redirectToFronted("/payment/success");
const paymentFail = redirectToFronted("/payment/fail");
const paymentCancel = redirectToFronted("/payment/cancel");



module.exports = {
  makePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel
};