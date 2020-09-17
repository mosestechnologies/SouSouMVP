import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/GlobalState";
// reactstrap components
import {
  Button, Card, CardHeader,
  CardBody, FormGroup, Form,
  Input, InputGroupAddon,
  InputGroupText, InputGroup,
  Row, Col
} from "reactstrap";

import Axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

function Register () {
  const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	// const [error, setError] = useState();

  const [registerStatus, setRegisterStatus] = useState(false);

	const { state } = useContext(AuthContext);
  // const navigate = useNavigate();

  const submit = async (e) => {
		e.preventDefault();

    const newUser = { first_name, last_name, username, password, email };
    await Axios.post("https://sousou-app.herokuapp.com/api/auth/register", newUser)
    .then(response => {
      console.log('Registered Successfully', response);
      // LogginIn
      setRegisterStatus(true);
      Axios.post("https://sousou-app.herokuapp.com/api/auth/login", {
        email,
        password,
      }).then( response => {
        console.log('LoggedIn', response);
        localStorage.setItem('auth-token', response.data.token); // saving token to localstorage
        localStorage.setItem('login', true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      })
      .catch( error => console.log('Error LoggingIn ', error));

    })
    .catch(error => console.log('Error signing up', error));

	};

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <h1 className="display-4">Register</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">

{/* ------------------------------- FORM Start ------------------------------- */}
                <Form role="form">
                  {/** @FirstName */}
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="firstName" placeholder="First Name" type="text" onChange={(e) => setFirst_name(e.target.value)}/>
                    </InputGroup>
                  </FormGroup>

                  {/** @LasttName */}
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="lastName" placeholder="Last Name" type="text" onChange={(e) => setLast_name(e.target.value)} />
                    </InputGroup>
                  </FormGroup>

                  {/** @username */}
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" placeholder="User Name" type="text" onChange={(e) => setUsername(e.target.value)} />
                    </InputGroup>
                  </FormGroup>

                  {/** @Email */}
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="new-email"/>
                    </InputGroup>
                  </FormGroup>

                  {/** @Password */}
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"/>
                    </InputGroup>
                  </FormGroup>

                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">strong</span>
                    </small>
                  </div>
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button" onClick={submit}>
                      Create account
                    </Button>
                  </div>
                  {
                    registerStatus ? (
                      <div className="success">
                        Successfully Registered
                      </div>
                    ) : (<div></div>)
                  }
                </Form>

{/* ------------------------------- FORM Start ------------------------------- */}

            </CardBody>
          </Card>
        </Col>
      </>
    );
}


export default Register;
