const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const { routes } = require('./router');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

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

app.use(routes)

app.listen(port, () => {
    console.log(`server is runnig on port ${port}`);
})