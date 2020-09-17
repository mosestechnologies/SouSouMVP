import React from 'react';
import Header from "components/Headers/Header.js";
import {
    Button, Card, CardHeader, CardBody,
    NavItem, NavLink, Nav,
    Container,Row, Col
} from "reactstrap";

const Group = () => {
    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Card className="shadow border-0">
                    <div className="card" >
                        <div className="card-header">
                            <center>
                                <h2>Group Title</h2>
                            </center>
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    );
}

export default Group;