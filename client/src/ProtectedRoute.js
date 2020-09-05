import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, reducer, initialState } from "./context/GlobalState";

export const ProtectedRoute = ({ render: Component, ...rest }) => {
    // const [state] = React.useReducer(reducer);
    const { state, dispatch } = React.useContext(AuthContext);
    //const { userData, setUserData } = useContext(GlobalState);
    return (
        <Route
            {...rest}
            render={props => {
                console.log('AUTH CONTEXT: ', state);
                console.log('STATE: ', state)
                if (state.isAuthenticated) {
                    return (<Component {...props} />);
                } else {
                    return (
                        <Redirect
                        to={"/auth/login"}
                        />
                    );
                }
            }}
        />
    );
};
