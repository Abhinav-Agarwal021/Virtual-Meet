const roomDto = require("../dtos/roomDto");
const RoomService = require("../Services/RoomService");

class RoomsController {

    async create(req, res) {
        const { server, ownerId, participant } = req.body;

        if (!ownerId||!participant) {
            return res.status(400).json({ message: "server people are required" });
        }

        const room = await RoomService.create({
            server,
            ownerId,
            participant
        })

        res.json(new roomDto(room))
    }

    async getRooms(req, res) {

        try {

            const rooms = await RoomService.getAllRooms(req.params.userId)
            const allRooms = rooms.map((room) => new roomDto(room))
            return res.json(allRooms)

        } catch (error) {
            res.status(400).json(error)
        }

    }

    async getRoomId(req, res) {
        try {
            const room = await RoomService.getRoomUId(req.params.roomId)
            return res.json(room)
        } catch (error) {

        }
    }

}

module.exports = new RoomsController();