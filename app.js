/* --------------------------------- Imports -------------------------------- */
require('dotenv').config({debug: true});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

var cors = require('cors')


//  Importing  routes
const usersRoutes = require('./modules/users/routes/users');  // Users routes import
const groupRoutes = require('./modules/group/routes/group');
const authRoute = require('./modules/auth/auth');
const paymentRoutes = require('./modules/payment/routes/payment');

/* ------------------------------- Middleware ------------------------------- */

app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded
app.use(morgan('combined'));  // Outut to console the request routes + status
app.use(cors()) // Use this after the variable declaration
/* --------------------------------- Routes --------------------------------- */

app.use('/payment', express.static(path.join(__dirname, 'static')));

app.use('/users', usersRoutes);  // Connecting to Products
app.use('/group', groupRoutes);
app.use('/api/auth', authRoute); // Connected to Authentication
app.use('/payment', paymentRoutes);

app.get("/", (req, res) => {
    res.json({'Success': 'Welcome home'});
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

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`<<<  Sever Started  >>> on port ${port}`);
});