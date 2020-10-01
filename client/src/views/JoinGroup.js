import React, { useEffect, useState } from 'react';
import { AuthContext } from "context/GlobalState";

import Axios from 'axios';

const JoinGroup = (props) => {
    console.log("props: ", props);

    let renderCount = 0;
    console.log(`Render ${++renderCount} 😡`);

    const { groupId } = props.match.params;
    const { userId } = props.match.params;
    const [isGroupFull, setIsGroupFull] = useState(false);
    const [groupTitle, setGroupTitle] = useState("");
    const { state } = React.useContext(AuthContext);

    const handleGroupJoin = () => {
        const parseUser = state.user;
        console.log("Joining");

        Axios.post(`/group/joingroup/${userId}/${groupId}`, {userID: parseUser.id},{
            headers: {
                'Content-Type': 'application/json',
                'auth-token': state.token
            }
        })
        .then( response => {
            console.log('Successfully Joined the group: ', response);
        })
        .catch( error => {
            console.log(error);
        })
    };
    useEffect(() => {
        let user = state.user ? state.user : JSON.parse(localStorage.getItem("user"));
        if (!user) {
            return props.history.push('/auth/login');
        }

        // Axios.post(`/group/get-group/${groupId}`, {memberID: user.id},{
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'auth-token': state.token
        //     }
        // })
        // .then( response => {
        //     console.log('Group DATA Successfully', response.data.group);

        // }).catch(error => {
        //     console.log('ERROR:>> ', error);
        // });
    }, []);

    return (
        <div className="mt-7 row justify-content-center">
            <h1 className="mr-4">Welcome</h1>
            <button className="btn btn-success btn-lg" onClick={ handleGroupJoin }>Join</button>
        </div>
    );
}

export default JoinGroup;