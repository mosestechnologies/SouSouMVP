import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";
export const Header = () => {
  const {userData,setUserData} = useContext(GlobalState);
  //navigation
  let navigate = useNavigate();
  function log() {
    navigate("/login");
  }
  function reg() {
    navigate("/register");
  }
  function home() {
    navigate("/");
  }
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand onClick={home}>Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {userData.user ? (
     
              <Button variant="info" onClick={logout}>
             Logout
              </Button>
            ) : (
              <>
                <Button variant="info" className="m-1" onClick={log}>
                  Login
                </Button>
                <Button variant="info" className="m-1" onClick={reg}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
