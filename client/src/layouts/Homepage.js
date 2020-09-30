import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import "./Homepage.css";
import { Button } from 'reactstrap';

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

function Homepage() {
  return (
    <div class="homepage">
      <div className="color_overlay"></div>
      <AuthNavbar />
      <div className="home__content">
        <h1>SouSou</h1>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
        <Button  className="button" onClick >Register Now</Button>
      </div>

       <AuthFooter class="home__footer" />
    </div>
  );
}

export default Homepage;
