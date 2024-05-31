const { ConverstaionModel } = require("../models/Conversation");
const { StatusCodes: HttpStatus } = require('http-status-codes');
const createError = require('http-errors')

async function addNameSpace(req, res, next) {
    try {
        console.log(req.body);
        const { name, endpoint } = req.body;
        await findNameSpaceWithEndpoint(endpoint);
        const converstaion = await ConverstaionModel.create({ name, endpoint });
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

async function getListOfNameSpaces(_req, res, next) {
    try {
        const nameSpaces = await ConverstaionModel.find({}, { rooms: 0 });
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: {
                message: "all name spaces",
                nameSpaces
            }
        })
    } catch (error) {
        next(error)
    }
}

async function findNameSpaceWithEndpoint(endpoint) {
    try {
        const converstaion = await ConverstaionModel.findOne({ endpoint });
        if (!!converstaion) {
            throw createError.BadRequest("this conversation created !!")
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    addNameSpace,
    getListOfNameSpaces
}