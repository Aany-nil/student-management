
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = '<your_store_id>'
const store_passwd = '<your_store_password>'
const is_live = false //true for live, false for sandbox


const makePayment = async (req, res) => {
 console.log("hello payment");
};



module.exports = {
  makePayment,

};