const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const { routes } = require('./router');
const mongoose = require('mongoose');
const { nameSpaceRoutes } = require('./router/namespace');
const { roomRoutes } = require('./router/rooms');

const app = express();
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


app.listen(port, () => {
    console.log(`server is runnig on port ${port}`);
})