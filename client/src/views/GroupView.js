import React, { useState, useEffect, useReducer } from 'react';
import Header from "components/Headers/Header.js";
import {
    Card, CardHeader, CardBody,
    Table, Media, Container,
} from "reactstrap";
import copy from "copy-to-clipboard";
import Axios from "axios";
import { AuthContext } from "context/GlobalState";

const initialState = {
    group: {},
    isFetching: false,
    hasError: false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_GROUP_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_GROUP_SUCCESS":
            return {
                ...state,
                isFetching: false,
                group: action.payload,
            };
        case "FETCH_GROUP_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };
        default:
            return state;
    }
};
const GroupView = (props) => {
    const [groupState, dispatch] = useReducer(reducer, initialState);
    const [groupMembers, setMembers] = useState();
    const { groupId } = props.match.params;
    const { state } = React.useContext(AuthContext);
    const token = state.token ? state.token : localStorage.getItem("auth-token");
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user){
            props.history.push('/auth/login');
        }
        const memberID = JSON.stringify({memberID: user.id});
        dispatch({
            type: "FETCH_GROUP_REQUEST",
        });
        console.log('DISPATCH Fetching: ', groupState);
        Axios.post(`/group/get-group/${groupId}`, {memberID: user.id},{
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        .then( response => {
            console.log('Group DATA Successfully received: ', response.data.group);
            setMembers(response.data.group.members);
            dispatch({
                type: "FETCH_GROUP_SUCCESS",
                payload: response.data.group,
            });
            // setAmount(parseInt(response.data.group.payment_frequency));
        }).catch(error => {
            console.log('ERROR:>> ', error);
        });
    }, []);
    return (
        <div>
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
                        {
                            groupState.isFetching ? (
                               
                               <tr>
                                <th scope="row" >
                                    <Media className="align-items-center">
                                        <Media>
                                            <span className="mb-0 text-sm">
                                                {console.log("groupState.isFetching 2?" , groupState.isFetching)}
                                                { console.log('groups:: ', typeof(groupState.group.members)) }
                                                {/* { console.log('groups 2:: ', groupState.group.members} */}
                                                { console.log("GROUP MEMBERS:: ", groupMembers) }
                                                { console.log("GROUP MEMBERS:: ", typeof(groupMembers)) }
                                                {
                                                    console.log(Object.prototype.toString.call(groupMembers) == '[object Array]')
                                                }
                                                {
                                                    // console.log(groupState.group.members.reduce((a, obj) => a + Object.keys(obj).length, 0))
                                                }
                                                { `${groupState.group.members_limit} ` }
                                                </span>
                                        </Media>
                                    </Media>
                                </th>
                                {/* <td>{groupData.members.length}</td> */}
                                <td>{groupState.group.payment_frequency}</td>
                                <td>{groupState.group.payment_cycle}</td>
                            </tr>
                            ) : 
                            groupState.hasError ? (
                                <tr>ERROR...</tr>
                            ) : (
                            
                                <tr>
                                    {console.log("groupState.isFetching 1?" , groupState.isFetching)}
                                    LOADING...
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default GroupView;