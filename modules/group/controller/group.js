const Group = require('../model/group');


exports.create = async (req,res) => {
    try{
		console.log("Request: ", req.body);
		const data = await Group.insertMany(req.body)
		res.status(302).send("user successfully Created");
    }catch(err){
		console.log("Error: ", err);
		res.json({message : err});
	}
}