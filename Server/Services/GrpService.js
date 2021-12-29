const CategoryModel = require("../models/CategoryModel");
const UserRolesModel = require("../models/UserRolesModel");
const ChannelModel = require("../models/ChannelModel")

const crypto = require('crypto');
const InviteCodesModel = require("../models/InviteCodesModel");

class GrpService {
    async CreateCat(data) {
        const { roomId, name, role } = data;

        const cat = await CategoryModel.create({
            roomId,
            name,
            role
        })

        return cat;
    }

    async createRole(data) {
        const { roomId, userId, role } = data;

        const user = await UserRolesModel.create({
            roomId,
            userId,
            role
        })

        return user;
    }

    async createChannel(data) {
        const { categoryId, name, type, roomId } = data;

        const channel = await ChannelModel.create({
            categoryId,
            name,
            roomId,
            type
        })

        return channel;
    }

    async getRoom(data) {
        const roomId = data;

        const room = await CategoryModel.find({ roomId })

        return room;
    }

    async getChannels(data) {
        const roomId = data;

        const channel = await ChannelModel.find({ roomId })

        return channel;
    }

    async generateCode() {
        const code = crypto.randomInt(100000, 999999)
        return code;
    }

    async createCodes(data) {
        const { roomId, code } = data;

        const Invites = await InviteCodesModel.create({
            roomId,
            code,
            expired: false,
            used: 0
        })

        return Invites;
    }

    async getCodeData(data) {
        const roomId = data;
        const codeInfo = await InviteCodesModel.find({ roomId, expired: false })
        return codeInfo;
    }

    async getCodeInfo(data) {
        const code = data;

        const CodeInfo = await InviteCodesModel.findOne({ code });
        return CodeInfo;
    }

    async updateCodeInfo(data) {
        const code = data;

        await InviteCodesModel.findOneAndUpdate({ code }, { expired: true });
    }

    async getUserRoles(data) {
        const { roomId, userId } = data;

        const user = await UserRolesModel.find({ roomId, userId });
        return user;
    }

    async updateUsedPeople(data) {
        const code = data;

        await InviteCodesModel.findOneAndUpdate(
            {
                code
            },
            {
                $inc: {
                    used: 1
                }
            }
        )
    }
}

module.exports = new GrpService();