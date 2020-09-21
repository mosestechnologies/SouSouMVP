import React, { useEffect } from 'react';
import Axios from 'axios';

const JoinGroup = (props) => {
    const { groupId } = props.match.params;
    const { userId } = props.match.params;
    console.log(groupId, userId);
    const handleGroupJoin = () => {
        Axios.get(`/group/joingroup/${userId}/${groupId}`, {
            headers: {
                'Content-Type': 'application/json'
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
    }, []);

    return (
        <div className="mt-7 row justify-content-center">
            <h1 className="mr-4">Welcome</h1>
            <button className="btn btn-success btn-lg" onClick={ handleGroupJoin }>Join</button>
        </div>
    );
}

export default JoinGroup;