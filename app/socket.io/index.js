const { initConnection, createNamespacesConnection } = require("./namespace.socket")

module.exports = {
    socketHandler: (io) => {
        initConnection(io)
        createNamespacesConnection(io)
    }
}