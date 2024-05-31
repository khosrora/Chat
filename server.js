const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const { routes } = require('./app/router');
const mongoose = require('mongoose');
const { nameSpaceRoutes } = require('./app/router/namespace');
const { roomRoutes } = require('./app/router/rooms');
const { initialSocket } = require('./app/socket.io/socket.io.server');
const http = require('http');
const { socketHandler } = require('./app/socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.urlencoded())
app.use(express.json())

const connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/chat_service");
        console.log('connect to mongo db');
    } catch (error) {
        console.log('connect db failed');
    }
};

connectDB();
const io = initialSocket(server);
socketHandler(io)

app.use(expressEjsLayouts);
app.use(express.static('public'))
app.set("view engine", "ejs");
app.set("views", "resource/views");
app.set("layout", "./layouts/master");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("", routes)
app.use("/namespaces", nameSpaceRoutes)
app.use("/room", roomRoutes)


server.listen(port, () => {
    console.log(`server is runnig on port ${port}`);
})