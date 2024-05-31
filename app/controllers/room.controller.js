const { ConverstaionModel } = require("../models/Conversation");
const { StatusCodes: HttpStatus } = require('http-status-codes');
const createHttpError = require("http-errors");


async function addRoom(req, res, next) {
    try {
        const { name, description, namespace } = req.body;
        await findConversationWithEndpoint(namespace);
        await findRoomWithName(name);
        const room = { name, description };
        const converstaion = await ConverstaionModel.updateOne({ endpoint: namespace }, {
            $push: {
                rooms: room
            }
        });
        res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: {
                message: "name space is created !!",
                converstaion
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getRooms(_req, res, next) {
    try {
        const rooms = await ConverstaionModel.find({}, { rooms: 1 });
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: {
                message: "all name spaces",
                rooms
            }
        })
    } catch (error) {
        next(error)
    }
}


async function findRoomWithName(name) {
    try {
        const rooms = await ConverstaionModel.findOne({ 'rooms.name': name });
        if (!!rooms) { throw createHttpError.BadRequest("this rooms created !!") }
    } catch (error) {
        console.log(error);
    }
}

async function findConversationWithEndpoint(endpoint) {
    try {
        const conversation = await ConverstaionModel.findOne({ endpoint });
        if (conversation === null) { throw createHttpError.NotFound("conversation not found") }
        return conversation
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addRoom,
    getRooms
}