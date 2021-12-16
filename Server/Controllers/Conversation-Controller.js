const conversationDto = require('../dtos/conversationDto');
const conversation = require('../models/ConversationModel')
const Message = require('../models/MessageModel')

class ConversationController {

    async chatApp(req, res) {

        const { senderId, receiverId } = req.body;


        try {
            const newConversation = await conversation.create({
                members: [senderId, receiverId],
            })
            return res.status(200).json(new conversationDto(newConversation))
        } catch (error) {
            res.status(500).json({ message: "Conversation error" })
        }
    }

    async getIds(req, res) {
        try {
            const Conversation = await conversation.find({
                members: { $in: [req.params.userId] }
            })
            return res.status(200).json(Conversation)
        } catch (error) {
            res.status(500).json({ message: "cannot fetch your chats" })
        }
    }

    async sendChats(req, res) {
        const newMessage = new Message(req.body)

        try {
            const savedmessage = await newMessage.save()
            return res.status(200).json(savedmessage)
        } catch (error) {
            res.status(500).json({ message: "message can't be sent" })
        }
    }

    async getChats(req, res) {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            })
            return res.status(200).json(messages)
        } catch (error) {
            res.status(500).json({ message: "chats cannot be synced" })
        }
    }
}

module.exports = new ConversationController()