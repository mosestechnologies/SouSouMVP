const route = require('express').Router();
const jwt = require('jsonwebtoken');const router = require('express').Router();
const UsersModel = require('./modules/users/model/users');
const passwordHashing = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registration Route
router.post('/register', async (req, res)=>{
    // Password Hashing
    const salt = await passwordHashing.genSalt(10);
    const hashedPassword = await passwordHashing.hash(req.body.password, salt); // Generating Hash

    const addUser = new UsersModel({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "password": hashedPassword,
        "email": req.body.email,
        "date": req.body.date
    });
    try {
        const userSaved = await addUser.save();  // Registering User
        res.status(200).json({"Registered" : userSaved.username});
    } catch (error) {
        console.log('error occured');
        res.status(400).send(error); // Error Handling
    }
});

// Login Route
router.post('/login', async (req, res)=>{
    console.log(req.body);
    try {
        const checkEmail = await UsersModel.findOne({email : req.body.email});  // Verifying Email
        if (checkEmail) // If valid Email, Else Throw Error
        {
            // Verifying Password
            const checkPassword = await passwordHashing.compare(req.body.password, checkEmail.password);
            if(checkPassword) // if Valid Password, Else Throw Error
            {
                const token = jwt.sign({
                    id: checkEmail._id,
                    usernaem: checkEmail.username
                },
                process.env.TOKEN_SECRET
                );
                res.header("auth-token", token).json({'Welcome' : 'Successfully loggedIn', 'Token': token});
            }
            else throw({'Error': 'Wrong password'});
        }
        else{
            throw({'Error': 'Invalid Credentials'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports =  router;


route.post('/register', (req, res)=>{
    console.log("Request: ", req.body);
    try{
		console.log("Request: ", req.body);
		const data = await UsersModel.insertMany(req.body)
        console.log("Data: ", data);
        console.log(await UsersModel.find())
		res.status(302).send("user successfully added");
    }catch(err){
		console.log("Error: ", err);
		res.json({message : err});
	}
});

route.post('/login', (req, res)=>{

});

module.exports = route;
