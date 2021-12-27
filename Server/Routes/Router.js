const router = require('express').Router();
const { sendOtp, verifyOtp, activateUser, refresh, logout, getUser, getUserByData } = require('../Controllers/Auth-Controllers')
const { chatApp, getIds, sendChats, getChats, getConversation } = require('../Controllers/Conversation-Controller');
const { createCat, createRole, createChannel, getRoom, getChannels, generateInviteCode, verifyInvitecode } = require('../Controllers/Grp-controller');
const { create, getRooms, getRoomId, updateRoom } = require('../Controllers/Rooms-Controller');
const authMiddlewares = require('../middlewares/authMiddlewares')

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/activate-user', authMiddlewares, activateUser);
router.get('/refresh', refresh);
router.post('/logout', authMiddlewares, logout)
router.post('/rooms', create);
router.post('/updateRoom', updateRoom)
router.post('/chat', chatApp);
router.get('/chat/:userId', getIds);
router.get('/conv/:convId', getConversation);
router.get('/user/:userId', getUser);
router.post('/chats', sendChats);
router.get('/chats/:conversationId', getChats);
router.get('/userData', getUserByData)
router.get('/rooms/:userId', authMiddlewares, getRooms)
router.get('/room/:roomId', getRoomId)

router.post('/grp/cat', createCat);
router.post('/grp/role', createRole)
router.post('/grp/channels', createChannel)

router.get('/grp/:roomId', getRoom)
router.get('/grp/channels/:roomId', getChannels)

router.post('/grp/codes', generateInviteCode)
router.post('/grp/invites', verifyInvitecode);

module.exports = router;