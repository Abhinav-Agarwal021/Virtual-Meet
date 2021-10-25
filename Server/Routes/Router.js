const router = require('express').Router();
const { sendOtp, verifyOtp, activateUser, refresh, logout } = require('../Controllers/Auth-Controllers')
const { chatApp, getIds, sendChats, getChats } = require('../Controllers/Conversation-Controller')
const authMiddlewares = require('../middlewares/authMiddlewares')

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/activate-user', authMiddlewares, activateUser);
router.get('/refresh', refresh);
router.post('/logout', authMiddlewares, logout)
router.post('/chat', chatApp);
router.get('/chat/:userId', getIds);
router.post('/chats', sendChats);
router.get('/chats/:conversationId', getChats);

module.exports = router;