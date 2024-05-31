const router = require('express').Router();
const controller = require('../controllers/room.controller');

router.post('/add', controller.addRoom)
router.get('/list', controller.getRooms)

module.exports = {
    roomRoutes: router
}