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

    async updateRoomInfo(data) {
        const { Id, userId } = data;

        const room = await RoomModel.findById(Id)

        const contain = room.members.includes(userId)

        if (!contain) {
            await RoomModel.updateOne(
                { _id: Id },
                {
                    $push: {
                        members: userId
                    }
                }
            )
        }

        const updatedRoom = await RoomModel.findById(Id);
        return updatedRoom;
    }

    async leaveRoom(data) {
        const { roomId, userId } = data;

        await RoomModel.updateOne(
            { _id: roomId },
            {
                $pull: {
                    members: userId
                }
            }
        )
    }

}

module.exports = new RoomService();