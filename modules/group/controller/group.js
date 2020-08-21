const Group = require('../model/group');


exports.create = async (req,res) => {
    try{
		console.log("Request: ", req.body);
		const data = await Group.insertMany(req.body)
		res.status(302).send("group successfully Created");
    }catch(message){
		console.log("Error: ", message);
		res.json({message : message});
	}
}

exports.get_groups = async (req, res) => {
	try {
		const data = await Group.findOne({ title: 'Group-1' }).
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
}