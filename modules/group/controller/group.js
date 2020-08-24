const Group = require('../model/group');
const User = require('../../users/model/users');

exports.create = async (req, res) => {
	try {
		console.log("Request: ", req.body);
		const data = await Group.insertMany(req.body)
		res.status(302).send("group successfully Created");
	} catch (message) {
		console.log("Error: ", message);
		res.json({ message: message });
	}
}

exports.get_groups = async (req, res) => {
	try {
		const data = await Group.findOne({ title: 'Group-2' }).
			populate('members').
			exec(function (err, data) {
				if (err) return handleError(err);
				console.log(data);
				res.json({ Groups: data })
			});

	} catch (error) {
		console.log("Error: ", message);
		res.json({ message: error })
	}
}

exports.join_group = async (req, res) => {
	try {
		let userID = req.params.userID;
		let groupID = req.params.groupID;
		//get the group of given group ID
		const group = await Group.findById(groupID);
		let memberLimit = group.members_limit;

		//  Check if already joined
		let membersArray = Object.values(group.members);
		for (const member of membersArray) {
			if (req.body.userID === member.toString()) {
				let responseJSON = {
					message: "Already Joined.",
					success: false
				}
				return res.json(responseJSON);
			}
		}

		let currentNumberOfMember = group.members.length;
		if (currentNumberOfMember < memberLimit) {
			//means there is still a place
			//get new user's details from POST body
			let newUserID = req.body.userID;
			const result = await Group.findByIdAndUpdate(groupID, { $push: { members: newUserID } });
			if (result) {

				//here check if the group is now full, then start the first cycle.
				group = await Group.findById(groupID);
				currentNumberOfMember = group.members.length;
				if (currentNumberOfMember == memberLimit) {
					let cycleJson = {
						cycle_number: 0,
						payment_arrived: [],
						total_arrived_payment: 0,
						current_status: "OnGoing"
					}

					await Group.findByIdAndUpdate(groupID, { $push: { cycle_status: cycleJson } })
					console.log("CYCLE STARTED");

				}

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
	} catch (err) {
		res.json(err);
	}
}

exports.test_payment = async (req, res) => {
	let userID = req.params.userID;
	let groupID = req.params.groupID;

	let group = await Group.findById(groupID);

	//check if the user belongs to this group
	if (group.members.includes(userID)) {
		//get the current cycle of payment...
		let currentCycle = group.cycle_status.length - 1;

		//check if the user has already paid or not
		let cycle_status = group.cycle_status;
		let membersWhoPaid = cycle_status[currentCycle].payment_arrived;
		if (!membersWhoPaid.includes(userID)) {
			//receive payment(call payment api here)
			membersWhoPaid.push(userID);

			cycle_status[currentCycle].cycle_number = currentCycle;
			cycle_status[currentCycle].payment_arrived = membersWhoPaid;
			cycle_status[currentCycle].total_arrived_payment = membersWhoPaid.length;

			//check if the cycle's whole payment is received?
			if (membersWhoPaid.length == group.members_limit) {
				//end this cycle and start new one
				cycle_status[currentCycle].current_status = "Completed";
				let result = await Group.findByIdAndUpdate(groupID, { cycle_status: cycle_status });
				if (result) {
					let newCycleJSON = {
						cycle_number: currentCycle + 1,
						payment_arrived: [],
						total_arrived_payment: 0,
						current_status: "OnGoing"
					}

					await Group.findByIdAndUpdate(groupID, { $push: { cycle_status: newCycleJSON } })
					console.log("NEW CYCLE STARTED");
					return  res.status(200).json({
						message: "Successfully received payment.",
						success: true
					})
				}else{
					return res.status(500).json({
						message: "Internal server error occured.",
						success: false
					})
				}
			} else {
				//continue with this cycle as not all payments are received
				cycle_status[currentCycle].current_status = "OnGoing";
				let result = await Group.findByIdAndUpdate(groupID, { cycle_status: cycle_status });
				if (result) {					
					//success
					return  res.status(200).json({
						message: "Successfully received payment.",
						success: true
					})
				} else {
					//failure
					return res.status(500).json({
						message: "Internal server error occured.",
						success: false
					})
				}
			}

		}else{
			res.status(400).json({
				message: "Payment already received.",
				success: false
			})
		}
	} else {
		let responseJSON = {
			message: "User do not belongs to this group.",
			success: false
		}

		res.status(404).json(responseJSON);
	}

}