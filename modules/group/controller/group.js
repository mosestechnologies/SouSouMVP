const Group = require('../model/group');
const User = require('../../users/model/users');

exports.create = async (req,res) => {
    try{
		console.log("Request: ", req.body);
		const data = await Group.insertMany(req.body)
		res.status(302).send("group successfully Created");
    }catch(message){
		console.log("Error: ", message);
		res.json({message : message});
	}
};

exports.get_groups = async (req, res) => {
	try {
		const data = await Group.findOne({ title: 'Group-2' }).
		populate('members').
		exec(function (err, data) {
			if (err) return handleError(err);
			console.log(data);
			res.json({Groups: data})
		});

	} catch (error) {
		console.log("Error: ", message);
		res.json({message: error})
	}
};

exports.join_group = async (req, res) => {
	try{
		let userID = req.params.userID;
		let groupID = req.params.groupID;
		//get the group of given group ID
		const group = await Group.findById(groupID);
		let memberLimit = group.members_limit;

		//  Check if already joined
		let membersArray = Object.values(group.members);
		for (const member of membersArray) {
			if (req.body.userID === member.toString())
			{
				return res.json({Error: "Already Joined"});
			}
		}

		let currentNumberOfMember = group.members.length;
		if(currentNumberOfMember < memberLimit){
			//means there is still a place
			//get new user's details from POST body
			let newUserID = req.body.userID;
			const result = await Group.findByIdAndUpdate(groupID, { $push: {members: newUserID}});
			if (result) {
				let responseJSON = {
					message: "Successfully joined group",
					result: result,
					success: true
				}
				res.status(200).json(responseJSON);
			} else {
				let responseJSON = {
					message: "Error adding user into group.",
					success: false
				}
				res.status(403).json(responseJSON);
			}
		} else {
			let responseJSON = {
				message: "Group is full",
				success: false
			}

			res.status(403).json(responseJSON);
		}
	} catch(err) {
		res.json(err);
	}
};

exports.loom = async (req, res) => {
	/**
	 * verify payment
	 * list of members
	 * payment status/ pending payments
	 * what members are paid / remaining members
	 * Slecting new winner
	 * paying the winner (Make payments)
	 * Making sure everyone is paid only once
	 *
	 *
	*/
};