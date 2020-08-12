// Imports
require('dotenv').config();
const express = require('express');
console.log("ENV: ", dotenv);
//console.log(require('dotenv').config({debug: true}));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken')

// local imports
const User = require('./modules/users/model/users');  // Users modle import
//require('dotenv/config');

//  Importing  routes
const usersRoutes = require('./modules/users/routes/users');  // Users routes import
const morgan = require('morgan');

// Middleware
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded
app.use(morgan('combined'));  // Output to console the request routes + status

    //  <<<<    ROUTES    >>>>
app.use('/users', usersRoutes);  // Connecting to Products
app.get("/", (req, res) => {
    res.json({'Success': 'Welcome home'})
})

mongoose.connect(
	process.env.CONNECT_DB,
	{
		useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
	},
	() => console.log("Database connected")
);
// server
app.listen(5000, ()=>{
    console.log("<<<  Sever Started  >>>");
});