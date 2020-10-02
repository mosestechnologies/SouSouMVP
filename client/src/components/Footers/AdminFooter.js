import React, { useState } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Nav,
  Modal,
  Label,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavItem,
  NavLink,
} from "reactstrap";

function AdminFooter() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © 2020{" "}
                <a className="font-weight-bold ml-1" href="#" target="_blank">
                  SouSou
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href="#" target="_blank">
                    SouSou
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" target="_blank">
                    About Us
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={toggle}>privacy policy</NavLink>
                </NavItem>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Privacy policy</ModalHeader>
                  <ModalBody>
                    What information do we collect? We collect information from
                    you when you register on our site. When registering on our
                    site, as appropriate, you may be asked to enter your: name,
                    e-mail address, mailing address, and phone number. What do
                    we use your information for? Any of the information we
                    collect from you may be used in one of the following ways:
                    To personalize your experience (your information helps us to
                    better respond to your individual needs) To improve our
                    website (we continually strive to improve our website
                    offerings based on the information and feedback we receive
                    from you) To improve customer service (your information
                    helps us to more effectively respond to your requests and
                    support needs) To administer a contest, promotion, survey or
                    other site feature Do we disclose any information to outside
                    parties? We do not sell, trade, or otherwise transfer to
                    outside parties your personally identifiable information.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={toggle}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default AdminFooter;
