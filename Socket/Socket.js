const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = [];

const peerUsers = {};
const socketToRoom = {};

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("user is connected...")

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, senderName, message }) => {
        io.local.emit("getMessage", {
            senderId,
            senderName,
            message,
        });
    });

    socket.on("join room", roomId => {
        if (peerUsers[roomId]) {
            const length = peerUsers[roomId].length;
            if (length === 10) {
                socket.emit("room is full")
                return;
            }
            if (!peerUsers[roomId].includes(socket.id)) {
                peerUsers[roomId].push(socket.id)
            }
        } else {
            peerUsers[roomId] = [socket.id];
        }

        socketToRoom[socket.id] = roomId;
        const usersinThisRoom = peerUsers[roomId].filter(id => id != socket.id)

        socket.emit("all users", usersinThisRoom);
    })

    socket.on("sendSignal", data => {
        io.to(data.userToSignal).emit('user joined', { signal: data.signal, callerId: data.callerId })
    })

    socket.on("returningSignal", data => {
        io.to(data.callerId).emit('receiving returned signal', { signal: data.signal, id: socket.id })
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})