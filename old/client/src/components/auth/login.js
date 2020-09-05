import React, { useState, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";
import Axios from "axios";
import $ from 'jquery';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { userData, setUserData } = useContext(GlobalState);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/api/auth/login",
        loginUser,
      ).then(function (response) {
        // handle success
        console.log(response);
        setUserData({
          token: response.data.token,
          user: response.data.user,
        });
        console.log("Context State", userData);
        // localStorage.setItem('login', JSON.stringify({'auth-token': response.data.token, 'login': true}));
        localStorage.setItem('auth-token', response.data.token);
        localStorage.setItem('login', true);
        navigate("/");
      })
      .catch(function (error) {
        // handle error
        console.log("Got an error: ", error);
      });


    } catch (err) {
      console.log(err, "error");
    }
  };
  return (
    <div style={{ backgroundColor: "#d1e8e2" }}>
      <div id="req-status"></div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" style={{ color: "#106466" }} textAlign="center">
            {/* <Image src={require("../images/header/4ir_logo.png")} /> */}
            <AccountCircle
              style={{ color: "#116466", fontSize: "4rem" }}
            />{" "}
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={submit}>
            <Segment stacked>
              <Form.Input
                fluid
                placeholder="E-mail address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                style={{ backgroundColor: "#106466", color: "white" }}
                fluid
                size="large"
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};
