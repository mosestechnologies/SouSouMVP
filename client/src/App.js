import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Homepage from "./components/homepage";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
				<div className="container">
				<Link className="navbar-brand" to={"/"}>Su Su</Link>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto">
					<Link className="nav-link" to={"/sign-in"}><span className="glyphicon glyphicon-log-in" /> Login</Link>
				<Link className="nav-link" to={"/sign-up"}><span className="glyphicon glyphicon-registration-mark" /> Registration</Link>
					</ul>
				</div>
				</div>
				</nav> */}
				<Navbar />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<div className="auth-wrapper">
						<div className="auth-inner">
							<Route path="/sign-in" component={Login} />
							<Route path="/sign-up" component={SignUp} />
						</div>
					</div>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
