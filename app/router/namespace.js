const router = require('express').Router();
const controller = require('../controllers/nameSpace.controller');

router.post('/add', controller.addNameSpace)
router.get('/list', controller.getListOfNameSpaces)
router.get('/list', controller.getListOfNameSpaces)

module.exports = {
    nameSpaceRoutes: router
}