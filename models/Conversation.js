const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    message: { type: String },
    dateTime: { type: String }
})

const roomSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    messages: { type: [messageSchema], default: [] },
})

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    endpoint: { type: String, required: true },
    rooms: { type: [roomSchema], default: [] }
})

module.exports = {
    ConverstaionModel: mongoose.model("converstaion", schema)
}