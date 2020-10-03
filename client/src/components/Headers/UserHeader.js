import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = (props) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          // backgroundImage:
          //   "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
          // backgroundSize: "cover",
          // backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h2 className="display-2 text-white">{`Hello ${props.nameTitle}`}</h2>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see and edit your details here
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
