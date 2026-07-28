const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    skipSuccessfulRequests: true,
    limit: 3,
    message: {
        error: "Too many requests, please try again after 5 minutes."
    }
});

module.exports = { limiter };