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

    async getRooms(payload) {
        const { ownerId } = payload;

        const {rooms} = await RoomModel.findById(ownerId)
        return rooms;
    }

}

module.exports = new RoomService();