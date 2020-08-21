import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";
import Homepage from "./components/homepage";
import Groups from './components/groups/groups';

//import "./App.css";
import "./black-dash.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Homepage} />

					<div className="auth-wrapper container">
						<div className="auth-inner">
							<Route path="/sign-in" component={Login} />
							<Route path="/sign-up" component={SignUp} />
						</div>
					</div>
					<Route path="/groups" component={Groups}/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;






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

