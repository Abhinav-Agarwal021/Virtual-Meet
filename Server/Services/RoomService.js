const RoomModel = require("../models/RoomModel");

class RoomService {

    async create(payload) {
        const { server, ownerId, participant } = payload;

        const room = await RoomModel.create({
            server,
            members: [ownerId, participant]
        })
        return room;
    }

    async getAllRooms(data) {

        const rooms = await RoomModel.find({
            members: {
                $in: [data]
            }
        })
        return rooms;
    }

    async getRoomUId(data) {
        const room = await RoomModel.findById(data)
        return room;
    }

}

module.exports = new RoomService();