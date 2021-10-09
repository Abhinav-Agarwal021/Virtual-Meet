const router = require('express').Router();
const { sendOtp, verifyOtp, activateUser, refresh, logout } = require('../Controllers/Auth-Controllers')
const authMiddlewares = require('../middlewares/authMiddlewares')

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/activate-user', authMiddlewares, activateUser);
router.get('/refresh', refresh);
router.post('/logout', authMiddlewares, logout)

module.exports = router;