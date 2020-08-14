const express = require('express');
const UsersModel = require('../model/users');
const router = express.Router()

	// Add user route
router.post('/', async (req,res) => {
	console.log("Request: ", req.body);
    try{
		console.log("Request: ", req.body);

		const data = await UsersModel.insertMany(req.body)
		console.log("Data: ", data);
		res.status(302).send("user successfully added");
    }catch(err){
		console.log("Error: ", err);
		res.json({message : err});
	}
});

	// Find user route
router.get('/find-user/:id', async (req,res) => {
	console.log("Request: ", req.params.id);
	try {
		const user = await UsersModel.findOne()
			.where("unique_id")
			.equals(Number(req.params.id))
		console.log(typeof(user));
		if (user) {
			res.json(user)
		} else {
			res.json({ unique_id: "No user found" })
		}
	} catch (error) {
		res.json(error)
	}
});

	// Delete user route
router.delete('/delete-user/:id', async (req, res)=>{
	try {
		const deleteUser = await UsersModel.deleteOne({unique_id : req.params.id})
		res.json({deleted : "Item deleted Successfully"})
	} catch (error) {
		res.json(error)
	}
});

	// Udpdate user route
router.put('/update', async (req, res)=>{
	try {
	} catch (error) {
		res.json(error)
	}
});

module.exports =  router;
