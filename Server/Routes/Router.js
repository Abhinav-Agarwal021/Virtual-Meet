const router = require('express').Router();
const { sendOtp, verifyOtp } = require('../Controllers/Auth-Controllers')

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;