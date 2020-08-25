const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');
const validate = require('../../auth/validator')

router.get('/', controller.create);
router.get('/create', validate,controller.create);

router.get('/get',controller.get_groups )

router.post('/joingroup/:userID/:groupID', controller.join_group);

router.post('/testpayment/:groupID/:userID', controller.test_payment);

module.exports =  router;