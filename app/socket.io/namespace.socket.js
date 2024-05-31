const { ConverstaionModel } = require("../models/Conversation")

function initConnection(io) {
    io.on("connection", async socket => {
        const namespaces = await ConverstaionModel.find({}, { name: 1, endpoint: 1 }).sort({ _id: -1 });
        socket.emit("namespaces_list", namespaces);
    })
}

async function createNamespacesConnection(io) {
    const namespaces = await ConverstaionModel.find({}, { endpoint: 1, rooms: 1 }).sort({ _id: -1 });
    for (const namespace of namespaces) {
        io.of(`/${namespace.endpoint}`).on('connection', async socket => {
            const conversation = await ConverstaionModel.findOne({ endpoint: namespace.endpoint }, { rooms: 1 , endpoint : 1 }).sort({ _id: -1 })

            socket.on("joinRoom", async roomName => {
                const lastRoom = Array.from(socket.rooms)[1];
                if (!!lastRoom) {
                    socket.leave(lastRoom)
                    await getCountOfUsers(io, conversation.endpoint, roomName)
                }
                socket.join(roomName)
                const roomInfo = conversation.rooms.find(item => item.name === roomName);
                socket.emit("room_info", roomInfo);
                await getCountOfUsers(io, conversation.endpoint, roomName)
                socket.on("disconnect", async () => {
                    await getCountOfUsers(io, conversation.endpoint, roomName)
                })
            })
            socket.emit("room_list", namespace.rooms)
        })
    }
}

async function getCountOfUsers(io, endpoint, roomName) {
    try {
        const onlineUsers = await io.of(`/${endpoint}`).in(roomName).allSockets();
        io.of(`/${endpoint}`).in(roomName).emit("online_users", Array.from(onlineUsers).length);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    initConnection,
    createNamespacesConnection
}