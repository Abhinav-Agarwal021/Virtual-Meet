const CategoryModel = require("../models/CategoryModel");
const UserRolesModel = require("../models/UserRolesModel");
const ChannelModel = require("../models/ChannelModel")

class GrpService{
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
        const { categoryId, name } = data;

        const channel = await ChannelModel.create({
            categoryId,
            name
        })

        return channel;
    }
}

module.exports = new GrpService();