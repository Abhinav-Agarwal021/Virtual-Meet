class roomDto{
    id;
    server;
    ownerId;
    createdAt;

    constructor(room) {
        this.id = room.id;
        this.server = room.server;
        this.ownerId = room.ownerId;
        this.createdAt = room.createdAt;
    }
}

module.exports = roomDto;