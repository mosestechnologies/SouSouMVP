/* --------------------------------- Imports -------------------------------- */
require('dotenv').config({debug: true});
const express = require('express');
//console.log(require('dotenv').config({debug: true}));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// local imports
const User = require('./modules/users/model/users');  // Users modle import

//  Importing  routes
const usersRoutes = require('./modules/users/routes/users');  // Users routes import
const authRoute = require('./auth');
const morgan = require('morgan');

/* ------------------------------- Middleware ------------------------------- */

app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded
app.use(morgan('combined'));  // Output to console the request routes + status


/* --------------------------------- Routes --------------------------------- */

app.use('/users', usersRoutes);  // Connecting to Products
app.use('/api/auth', authRoute); // Connected to Authentication

app.get("/", (req, res) => {
    res.json({'Success': 'Welcome home'})
})


/* -------------------------------- Database -------------------------------- */

mongoose.connect(
	process.env.CONNECT_DB,
	{
		useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
	},
	() => console.log("Database connected")
);

/* --------------------------------- server --------------------------------- */

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`<<<  Sever Started  >>> on port ${port}`);
});