const express = require('express');
const router = express.Router();
const controller = require('../controller/paypal');

router.get('/', controller.paymentHome)

router.get('/paypal', controller.paymentProcessor);

router.get('/success', controller.success);

router.get('/failed', controller.failed);

module.exports =  router;