const RoomModel = require("../models/RoomModel");

class RoomService {

    async create(payload) {
        const { server, dm, members, roles } = payload;

        const room = await RoomModel.create({
            server,
            dm,
            members,
            roles
        })
        return room;
    }

    async update(data) {
        const { dm, members } = data;

        const update = await RoomModel.updateOne({ dm }, { $push: { members } })
        return update;
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