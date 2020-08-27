import React, { useState, useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";
import Axios from "axios";
// import ErrorNotice from "../errorNotice/Error";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Image,
  Message,
  GridColumn,
  FormInput,
} from "semantic-ui-react";

export const Register = () => {
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [unique_id,setUnique_id] = useState();
  const { setUserData } = useContext(GlobalState);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { first_name,last_name,username,password,email,unique_id};
      await Axios.post("http://localhost:5000/api/auth/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.token,
        user: loginRes.user,
      });
      localStorage.setItem("auth-token", loginRes.token);
      navigate("/");
    } catch (err) {

      console.log(err);
    }
  };
  return (
    <div style={{ backgroundColor: "#d1e8e2" }}>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" style={{ color: "#106466" }}>
            <AccountCircle style={{ color: "#116466", fontSize: "4rem" }} />{" "}
            Register
          </Header>
          <Form size="large" onSubmit={submit}>
            <Segment stacked>
              <FormInput
                fluid
                name="firstname"
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirst_name(e.target.value)}
              />
              <FormInput
                fluid
                name="lastname"
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLast_name(e.target.value)}
              />
              <FormInput
                fluid
                name="username"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
               <FormInput
                fluid
                name="unique-id"
                placeholder="Unique ID"
                type="text"
                onChange={(e) => setUnique_id(e.target.value)}
              />
              <FormInput
                fluid
                name="email"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                fluid
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fluid
                style={{ backgroundColor: "#106466", color: "white" }}
              >
                Submit
              </Button>
            </Segment>

            <Message>
              Already a Member? <Link to="/login">Login</Link>
            </Message>
          </Form>
        </GridColumn>
      </Grid>
    </div>
  );
};
