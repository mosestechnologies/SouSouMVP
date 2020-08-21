const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');

router.get('/', controller.create);
router.post('/joingroup/:userID/:groupID');

module.exports =  router;