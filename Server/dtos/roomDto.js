class roomDto{
    id;
    server;
    ownerId;
    participant;
    createdAt;

    constructor(room) {
        this.id = room.id;
        this.server = room.server;
        this.ownerId = room.ownerId;
        this.createdAt = room.createdAt;
        this.participant = room.participant;
    }
}

module.exports = roomDto;