import React, { useState, useEffect } from 'react';
import Header from "components/Headers/Header.js";
import {
    Button, Card, CardHeader, CardBody,
    NavItem, NavLink, Nav, Table, Media,
    Container,Row, Col
} from "reactstrap";
import copy from "copy-to-clipboard";
import Axios from 'axios';
import paypal from 'paypal-rest-sdk';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Group = (props) => {
    const [inviteLink, setInviteLink] = useState();
    const [groupData, setGroupData] = useState([]);
    const [amount, setAmount] = useState();
    const { groupId } = props.match.params;

    const getUserId = () =>{
        let user = localStorage.getItem('user');
        if (!user){
             return props.history.push('/auth/login');
        }
        else {
            return user = JSON.parse(localStorage.getItem('user'));
        }
    }
    const token = localStorage.getItem('auth-token');

    const handleInputChange = (e) => setInviteLink(e.target.value);

    const copyLink = () => {
        copy(inviteLink, {
            debug: true,
            message: 'Press #{key} to copy',
        });
        console.log(inviteLink);
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user){
            props.history.push('/auth/login');
        }
        console.log('user id:: ', user.id);
        const memberID = JSON.stringify({memberID: user.id})
        console.log('memberID id:: ', memberID);

        Axios.post(`/group/get-group/${groupId}`, {memberID: user.id},{
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        .then( response => {
            console.log('Group DATA Successfully', response.data.group);
            setGroupData(response.data.group);
            setAmount(parseInt(response.data.group.payment_frequency));
        }).catch(error => {
            console.log('ERROR:>> ', error);
        });
    }, []);

    const client = {
        'sandbox': 'AYsJCaZfgj6KHfKlmYrkk5zRi5UdaDd94Ew6PtwfLA2c1JsocatAvZKtcHvUU-VMd1KHVjahJvsOLbnA', // please provide your client id here
        'client_secret': 'EG2EEx66Y9t1oWQPHfR32TQUcxa_Rm5n5uyZcE9S_yMqgDvqEabskqxj1cN9Eoc2GKPCShHfjIPqZjke'
    };
    const paymentOptions = {"application_context": { shipping_preference: 'NO_SHIPPING' }}

    const handlePayment = () => {
        console.log(amount);
        console.log(typeof(amount));
        // Axios.get(`/payment/paypal`, {amount: amount}, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'auth-token': token
        //     }
        // })
        // .then( response => {
        //     console.log('Payment Successfully Processed');
        // }).catch(error => {
        //     console.log('ERROR:>> ', error);
        // });
    };
    return (
        <>
            <Header/>
            <Container className="mt--9" fluid>
                <Card className="shadow border-0">
                    <div className="card" >
                        <CardHeader className="card-header">
                            <center>
                                {console.log('groupData', groupData)}
                                <h1>{groupData.title}</h1>
                            </center>
                            <div className="row justify-content-end mr-7">
                                {/* // TODO: Disablbe button if already paid */}
                                <PaypalExpressBtn client={client}  currency={'USD'} total={amount}
                                    paymentOptions={paymentOptions}
                                    style= {{
                                        color:  'gold',
                                        size:   'medium',
                                        shape:  'pill',
                                        label:  'pay',
                                        height: 40
                                    }}
                                    disabled
                                />
                            </div>
                        </CardHeader>
                        <div className="card-body">
                            <div className="row justify-content-center mb-4">
                                <div className="col-lg-9 col-sm-12 mt-4 row">
                                    <input className="col-lg-9 mr-4" type="text" disabled
                                        value={`https://www.sousou-app.herokuapp.com/joingroup/${getUserId()}/${groupId}`}
                                        onChange={ handleInputChange }
                                    />
                                    <button type="submit" onClick={ copyLink } className="col-2 btn btn-success">
                                        Copy invite Link
                                    </button>
                                </div>
                            </div>
                            <div className="row justify-content-center mb-4">
                                <div className="col-lg-6 col-sm-12">
                                    <h2>Members List</h2>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            // groupData.members.map((member)=>{
                                            //     return (
                                            //         <>
                                            //         <tr key={member._id}>
                                            //             <th scope="row" >
                                            //                 <Media className="align-items-center">
                                            //                     <Media>
                                            //                         <span className="mb-0 text-sm">
                                            //                             { `${member.first_name} ${member.last_name}` }
                                            //                             </span>
                                            //                     </Media>
                                            //                 </Media>
                                            //             </th>
                                            //             <td>{member.email}</td>
                                            //         </tr>
                                            //         </>
                                            //     )
                                            // })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <h2>Group Details</h2>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Limit</th>
                                                <th scope="col">Joined</th>
                                                <th scope="col">Installment</th>
                                                <th scope="col">Payment Cycle</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <th scope="row" >
                                                    <Media className="align-items-center">
                                                        <Media>
                                                            <span className="mb-0 text-sm">
                                                                { `${groupData.members_limit} ` }
                                                                </span>
                                                        </Media>
                                                    </Media>
                                                </th>
                                                {/* <td>{groupData.members.length}</td> */}
                                                <td>{groupData.payment_frequency}</td>
                                                <td>{groupData.payment_cycle}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    );
}

export default Group;