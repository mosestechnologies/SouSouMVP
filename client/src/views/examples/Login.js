import React, { useState, useContext, useEffect } from "react";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col
} from "reactstrap";
import { AuthContext } from "../../context/GlobalState";
import { login } from '../../utils/auth';
import '../MessageBar.css';

function Login (props) {
	
	const { state, dispatch } = useContext(AuthContext);
	const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };
	const [loginData, setloginData] = useState(initialState); // pass initial state

	const handleInputChange = event => {
        setloginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

	const submit = async (e) => {
		e.preventDefault();
		setloginData({
            ...loginData,
            isSubmitting: true,
            errorMessage: null
        });
		console.log('submitting');
		const loginUserData = {
			email: loginData.email,
			password: loginData.password
		};
		const setstate = async (token, loginStatus, userData) => {
			// console.log('response', token, loginStatus, userData);
			props.history.push('/admin/index');  // redirecting
		}
		login(loginUserData, setstate, dispatch); // passing user data + callback + dispatch action
	}

	useEffect(()=>{
		if (state.isAuthenticated){
			props.history.push('/admin/index');
		}
	}, []);
	return (
    <>
		<Col lg="5" md="7">
			<Card className="bg-secondary shadow border-0">
				<CardHeader className="bg-transparent pb-5">
					<div className="text-muted text-center mt-2 mb-3">
					<h1 className="display-4">Welcome Back</h1>
					</div>
				</CardHeader>
				<CardBody className="px-lg-5 py-lg-5">

{/* ------------------------------- Form Start ------------------------------- */}

						<Form role="form">
							<FormGroup className="mb-3">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									{/** ---------- @EMAIL ----------- */}
									<Input placeholder="Email"
										name="email"
										value={ loginData.email }
										onChange={ handleInputChange }
										type="email" autoComplete="new-email"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									{/**  --------- @PASSSWORD ---------- */}
									<Input placeholder="Password"
										name="password"
										value={ loginData.password }
										onChange={ handleInputChange }
										type="password"
										autoComplete="new-password"
									/>
								</InputGroup>
							</FormGroup>
							<div className="text-center">
								<Button className="my-4" color="primary" type="button" onClick={submit}>
									Sign in
								</Button>
								{
									state.isAuthenticated ? (
										<div className="success">
											Successfully Loggedin
										</div>
									) : (<div></div>)
								}
							</div>
						</Form>

{/* ------------------------------- Form End ------------------------------- */}

				</CardBody>
			</Card>
			<Row className="mt-3">
				<Col xs="6">
					<a className="text-light" href="#pablo" onClick={e => e.preventDefault()}>
						<small>Forgot password?</small>
					</a>
				</Col>
				<Col className="text-right" xs="6">
					<a className="text-light" href="#pablo" onClick={e => e.preventDefault()}>
					<small>Create new account</small>
					</a>
				</Col>
			</Row>
		</Col>
    </>
	);
}

export default Login;
