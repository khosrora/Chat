const router = require('express').Router();
const controller = require('../controllers/room.controller');
const { uploadFile } = require('../utils/multer');

router.post('/add', controller.addRoom)
router.get('/list', controller.getRooms)

module.exports = {
    roomRoutes: router
}