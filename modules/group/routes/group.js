const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');
const validate = require('../../auth/validator')

router.get('/create', validate,controller.create);

router.get('/get',controller.get_groups )

module.exports =  router;