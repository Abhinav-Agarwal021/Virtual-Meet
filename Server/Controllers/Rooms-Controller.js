const roomDto = require("../dtos/roomDto");
const RoomService = require("../Services/RoomService");

class RoomsController {

    async create(req, res) {
        const { server, dm, members, admin } = req.body;

        if (!server || !dm || !members || !admin) {
            return res.status(400).json({ message: "server details are required" });
        }

        const room = await RoomService.create({
            server,
            dm,
            members,
            admin
        })

        res.json(new roomDto(room))
    }

    async updateRoom(req, res) {
        const { dm, members } = req.body;

        const update = await RoomService.update({
            dm,
            members
        })

        return res.json(update)
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