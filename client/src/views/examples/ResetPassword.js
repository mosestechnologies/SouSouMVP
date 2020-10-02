import React, { useState } from 'react';
import {
    Button, Card,
    Container,Row
} from "reactstrap";
import Axios from 'axios';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [ email, setEmail ] = useState('');

    const handleSubmit = () => {
        Axios.post(`email/reset-password/${email}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            console.log('EMAIL SENT SUCCESSFULLY: ', response);
        })
        .catch( error => console.error("ERROR SENDING EMAIL: ",error));
    };
    return (
        <div>
            <Container className="mt-7 " fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow border-0">
                        <div className="card" >
                            <div className="card-header">
                                <Link to="/" className="btn btn-success">
                                    <small>Home</small>
                                </Link>
                                <center>
                                    <h2>Reset Password</h2>
                                </center>
                            </div>
                            <div className="row justify-content-center mb-4">
                                <div className="col-9 mt-4">

{/*<!-- -------------------------------- form --------------------------------- -->*/}

                                    <div className="form-group">
                                        <input type="email" placeholder="your email" onChange={ e => setEmail(e.target.value)} className="form-control" id="email"/>
                                    </div>
                                    <button id="add" type="submit" onClick={handleSubmit} className="btn btn-primary">
                                        Submit
                                    </button>

{/*<!-- ------------------------------ form end ------------------------------- -->*/}

                                    <div >
                                        {/* {
                                            createStatus ? (
                                                <div className="success">
                                                    Group Successfully Created
                                                </div>
                                            ) : (<div></div>)
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default ResetPassword;