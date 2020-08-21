import React from 'react';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top black">
        <div className="container">
          <Link className="navbar-brand" to={"/"}><h2>Su Su</h2></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li >
                <Link className="nav-link" to={"/sign-in"}>
                  <span className="glyphicon glyphicon-log-in" />
                  <h4>Login</h4>
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/sign-up"}>
                  <span className="glyphicon glyphicon-registration-mark" />
                  <h4>Registration</h4>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
