import { createContext } from 'react'

export const GlobalState = createContext(null);

export const AuthContext = createContext();

/**
 * The bellow snippet is our initial state object that will be used in our reducer.
 * The values in this object depend mainly on your use case. In our case we need to
 * check if a user is authenticated, contains the user data, and if a token was sent
 * back from the server after login.
 */

export const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};
console.log(initialState);
/**
 * a reducer (which is simply a function that takes in state
 * and action as parameters and returns a new state based on an action)
 */

/**
 * @param {*} state
 * @param {*} action
 *
 * The reducer function contains a case-switch statement that, based on certain actions,
 * returns a new state. The actions in the reducer are:
 *
 * @LOGIN — When this type of action is dispatched, it will also be dispatched with a
 * payload (containing user and token ). It saves the user and token to localStorage and
 * then returns a new state, setting isAuthenticated to true, and also sets the user and
 * token keys to their respective values based on the action’s payload.
 *
 * @LOGOUT — When this action is dispatched, we clear localStorage of all data and set user
 * and token to null .
 *
 * >>  If no action is dispatched, it returns the initial state.
 */
let i=0;
export const reducer = (state, action) => {
    console.log('this is it>>>>>',action );
    switch (action.type) {
        case "LOGIN":
            // console.log("USER ACTION: ", action.payload.user, i++ , " TOKEN ACTION: ", action.payload);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem('auth-token', action.payload.token); // saving token to localstorage
			localStorage.setItem('login', true);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};