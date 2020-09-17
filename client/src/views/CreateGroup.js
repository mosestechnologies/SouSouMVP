import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from "../context/GlobalState";
import {
    Button, Card, CardHeader, CardBody,
    NavItem, NavLink, Nav,
    Container,Row, Col
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Axios from 'axios';


import './MessageBar.css';

const CreateGroup = () => {
    // const { setUserData } = useContext(GlobalState);
    const data = {
        "title" : "",
        "members": "5f48fadb20130633e0299933",
        "created_by": "5f48fadb20130633e0299933",
        "target_amount": "",
        "payment_frequency": "",
        "payment_cycle": "Weekly",
        "members_limit": ""
    };

    const [title, setTitle] = useState();
	const [members_limit, setMembersLimit] = useState();
	const [target_amount, setTargetAmount] = useState();
	const [payment_frequency, setFrequency] = useState();
    const [payment_cycle, setCycle] = useState();
    // const [created_by, setCreator] = useState();
    const [createStatus, setCreateStatus] = useState();


    const createGroup = () => {
        const creator = JSON.parse(localStorage.getItem('user'));
        let created_by, members;
        if (creator){
            created_by = creator.id;
            members = creator.id;
            console.log(created_by);
        }
        const groupData = { title, members, members_limit, target_amount, payment_frequency, payment_cycle, created_by };
        try {
            const token = localStorage.getItem('auth-token');
            console.log(token);
            Axios.post('/group/create', groupData, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            })
            .then( response => {
                console.log('Group Created Successfully', response);
                setCreateStatus(true);
            }).catch(error => {
                console.log('ERROR:>> ', error);
                if (error.response.data.error){
                    console.log({
                        "ERROR: ":error,
                        'ERROR MESSAGE: ': error.response.data.error.message,
                        'ERROR TITLE: ': error.response.data.error.errors.title.message,
                        'ERROR KIND: ': error.response.data.error.errors.title.kind,
                        'ERROR NAME: ': error.response.data.error.errors.title.name,
                        'ERROR PATH': error.response.data.error.errors.title.path
                    });
                }
                //console.log('ERROR MESSAGE:>> ', error.response.data.error.message);
            });
        } catch (error) {
            console.log('ERROR CREATING GROUP: ', error);
        }

    };

    useEffect (() => {
        const successMessage = () => {
            if (createStatus === true){
                return (
                    <div className="success">
                        Group Successfully Created
                    </div>
                )
            }
        }
    }, [createStatus]);

    return (
        <div>
            <Header />
            <Container className="mt--7" fluid>
                <Row>

                    <div className="col">
                        <Card className="shadow border-0">
                        <div className="card" >
                            <div className="card-header">
                                <center>
                                    <h2>Enter Group Details</h2>
                                </center>

                            </div>
                            <div className="row justify-content-center mb-4">
                                <div className="col-9 mt-4">

{/*<!-- -------------------------------- form --------------------------------- -->*/}

                                    <div className="form-group">
                                        <input type="text" placeholder="Group Title" onChange={ e => setTitle(e.target.value)} className="form-control" id="title"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Members Limit" onChange={ e => setMembersLimit(e.target.value)} className="form-control" id="members"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Payment Frequency" onChange={ e => setFrequency(e.target.value)} className="form-control" id="frequency"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Target Amount" onChange={ e => setTargetAmount(e.target.value)} className="form-control" id="target"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Payment Interval" onChange={ e => setCycle(e.target.value)} className="form-control" id="interval"/>
                                    </div>

                                    <button id="add" type="submit" onClick={createGroup} className="btn btn-primary">Add</button>

{/*<!-- ------------------------------ form end ------------------------------- -->*/}

                                    <div >
                                        {
                                            createStatus ? (
                                                <div className="success">
                                                    Group Successfully Created
                                                </div>
                                            ) : (<div></div>)
                                        }
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

export default CreateGroup;
