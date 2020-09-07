const express = require('express');
const router = express.Router();
const controller =  require('../controller/usersController');
const validate = require('../../auth/validator');

	// Add user route
router.post('/', controller.add);

	// Find user route
router.get('/find-user/:id', validate, controller.find);

	// Delete user route
router.delete('/delete-user/:id', controller.delete);

	// Udpdate user route
router.put('/update', controller.update);

router.get('/referral/:userID/:groupID', controller.generateGroupReferral);



module.exports =  router;
