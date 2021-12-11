const RoomModel = require("../models/RoomModel");

class RoomService {

    async create(payload) {
        const { server, ownerId } = payload;

        const room = await RoomModel.create({
            server,
            ownerId
        })
        return room;
    }

}

module.exports = new RoomService();