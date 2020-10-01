import React, { useState, useEffect, useReducer } from "react";
import Header from "components/Headers/Header.js";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Media,
    Container,
} from "reactstrap";
import copy from "copy-to-clipboard";
import Axios from "axios";
// import paypal from "paypal-rest-sdk";
// import PaypalExpressBtn from "react-paypal-express-checkout";
import { AuthContext } from "context/GlobalState";
// import { PayPalButton } from "react-paypal-button-v2";
import PaypalBtn from 'react-paypal-checkout';

const initialState = {
    group: {},
    isFetching: false,
    hasError: false,
    paymentSuccess: false,
    paymentError: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_GROUPS_REQUEST":
            return {
            ...state,
            isFetching: true,
            hasError: false,
            };
        case "FETCH_GROUPS_SUCCESS":
            return {
            ...state,
            isFetching: false,
            group: action.payload,
            };
        case "FETCH_GROUPS_FAILURE":
            return {
            ...state,
            hasError: true,
            isFetching: false,
            };
        default:
            return state;
    }
};
const Group = (props) => {
    const [groupState, dispatch] = useReducer(reducer, initialState);
    const [inviteLink, setInviteLink] = useState();
    const [groupData, setGroupData] = useState({});
    const [amount, setAmount] = useState();
    const { groupId } = props.match.params;
    const { state } = React.useContext(AuthContext);
    let userData = state.user
            ? state.user
            : JSON.parse(localStorage.getItem("user"));

    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        /**
         * address: undefined
         * cancelled: false
         * email: "sb-lzmr83014728@personal.example.com"
         * paid: true
         * payerID: "ABNFPMH7TH83W"
         * paymentID: "PAYID-L5WJWUI2BS103595F222373J"
         * paymentToken: "EC-779245958D593204J"
         */
        const PAYPAL = {
            PAYPAL : {
                paypalEmail: payment.email,
                paid: payment.paid,
                payerID: payment.payerID,
                paymentID: payment.paymentID,
                paymentToken: payment.paymentToken,
                paymentMethod: 'paypal',
                userID: userData.id,
                userEmail: userData.email
            }
        }
        console.log('paymentSuccessData: ', PAYPAL);
        console.log("user", state.user);
        Axios.post(`/group/testpayment/${groupId}`, PAYPAL, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        .then( response => {
            console.log('Payment Successfully Processed', response);
        }).catch(error => {
            console.log('ERROR:>> ', error);
        });
    }
    const onCancel = (data) => {
        // User pressed "cancel" or closed Paypal's popup!
        console.log('The payment was cancelled!', data);
    }
    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
    }

    const client = {
        sandbox:
        "AYsJCaZfgj6KHfKlmYrkk5zRi5UdaDd94Ew6PtwfLA2c1JsocatAvZKtcHvUU-VMd1KHVjahJvsOLbnA",
    };
    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let locale = 'en_US';
    // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
    let style = {
        'label':'pay',
        'tagline': false,
        'size':'medium',
        'shape':'pill',
        'color':'gold',
        'height': 50
    };
    const token = state.token ? state.token : localStorage.getItem("auth-token");

    const handleInputChange = (e) => setInviteLink(e.target.value);

    const copyLink = () => {
        copy(inviteLink, {
        debug: true,
        message: "Press #{key} to copy",
        });
        console.log(inviteLink);
    };

    const paypalButtonDisplay = () => {
        const currentCycle = groupData.cycle_status.length - 1;
        return groupData.members.length < groupData.members_limit ? (
            <h3>GROUP NOT FULL</h3>
        ) : groupData.cycle_status[currentCycle].payment_arrived.includes(userData.id) ? (
            <h3>Paid for the current cycle</h3>
        ) : (
            <PaypalBtn
                env={env}
                client={client}
                currency={currency}
                total={amount}
                locale={locale}
                style={style}
                shipping={1}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />
        )
    };

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user){
            props.history.push('/auth/login');
        }
        const memberID = JSON.stringify({memberID: user.id});
        dispatch({
            type: "FETCH_GROUPS_REQUEST",
        });
        Axios.post(`/group/get-group/${groupId}`, {memberID: user.id},{
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        .then( response => {
            console.log('Group DATA Successfully received: ', response.data.group);
            dispatch({
                type: "FETCH_GROUPS_SUCCESS",
                payload: response.data.group,
            });
            setGroupData(response.data.group);
            setAmount(parseInt(response.data.group.payment_frequency));
        }).catch(error => {
            console.log('ERROR:>> ', error);
        });
    }, []);


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

                                {/* <PaypalExpressBtn client={client}  currency={'USD'} total={amount}
                                    paymentOptions={paymentOptions}
                                    style= {{
                                        color:  'gold',
                                        size:   'medium',
                                        shape:  'pill',
                                        label:  'pay',
                                        height: 40
                                    }}
                                    disabled
                                /> */}
                                {/* // TODO: Disable button, Only enable when payment cycle started */}
                                
                                {
                                    groupData.members ? paypalButtonDisplay() : ""
                                }
                            </div>
                        </CardHeader>
                        <div className="card-body">
                            <div className="row justify-content-center mb-4">
                                <div className="col-lg-9 col-sm-12 mt-4 row">
                                    <input className="col-lg-9 mr-4" type="text" readonly
                                        value={`https://www.sousou-app.herokuapp.com/joingroup/${userData.id}/${groupId}`}
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
                                                groupData.members ? (
                                                    groupData.members.map((member)=>{
                                                        return (
                                                            <>
                                                            <tr key={member._id}>
                                                                <th scope="row" >
                                                                    <Media className="align-items-center">
                                                                        <Media>
                                                                            <span className="mb-0 text-sm">
                                                                                { `${member.first_name} ${member.last_name}` }
                                                                                </span>
                                                                        </Media>
                                                                    </Media>
                                                                </th>
                                                                <td>{member.email}</td>
                                                            </tr>
                                                            </>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>NO DATA</tr>
                                                )

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
                                        {
                                            state.isFetching ? (
                                                <tr>LOADING...</tr>
                                            ) :
                                            state.hasError ? (
                                                <tr>ERROR...</tr>
                                            ) : (

                                            <tr>
                                                <th scope="row" >
                                                    <Media className="align-items-center">
                                                        <Media>
                                                            <span className="mb-0 text-sm">{ console.log('groups:: ', state.group)}
                                                                { `${groupData.members_limit} ` }
                                                                </span>
                                                        </Media>
                                                    </Media>
                                                </th>
                                                <td>{
                                                    groupData.members ? groupData.members.length : "0"
                                                }</td>
                                                <td>{groupData.payment_frequency}</td>
                                                <td>{groupData.payment_cycle}</td>
                                            </tr>
                                            )
                                        }
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
