
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = JSON.parse(process.env.IS_LIVE);
const frontendUrl = process.env.FRONTEND_URL;
const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 8000}`;
const apiBaseUrl = process.env.BASE_URL || "/api/v1";


const makePayment = async (req, res) => {
     const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `${backendUrl}${apiBaseUrl}/payment/success`,
        fail_url: `${backendUrl}${apiBaseUrl}/payment/fail`,
        cancel_url:`${backendUrl}${apiBaseUrl}/payment/cancel`,
        ipn_url: `${backendUrl}${apiBaseUrl}/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
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
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        // let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        // console.log(apiResponse)
        res.send(apiResponse)
    })
    .catch((error) => {
        res.status(502).json({
            success: false,
            message: "Unable to initialize payment",
            error: error.message
        })
    });
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