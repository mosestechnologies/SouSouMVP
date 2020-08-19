const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');

router.get('/', controller.create);

module.exports =  router;