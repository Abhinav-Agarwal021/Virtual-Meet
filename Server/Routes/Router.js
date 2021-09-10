const router = require('express').Router();
const { sendOtp } = require('../Controllers/Auth-Controllers')

router.post('/send-otp', sendOtp);

module.exports = router;