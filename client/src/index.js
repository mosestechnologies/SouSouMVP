import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { AuthContext, reducer, initialState } from "./context/GlobalState";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { ProtectedRoute } from './ProtectedRoute';
import Group from './views/Group';

/** <<<  @Styles  >>> */
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log('Initial State', initialState);

  useEffect(() => {
    console.log( 'JSON PARSE: ', JSON.parse(localStorage.getItem('user') ));
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token =  (localStorage.getItem('auth-token') || null);
    if(user && token){
      console.log("USER: ", user, " TOKEN: ", token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [state.token])

  return (
    <AuthContext.Provider value={ { state, dispatch } }>
      <HashRouter>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/admin" render={ props => <AdminLayout {...props} /> } />
          <Route path="/auth" render={ props => <AuthLayout {...props} /> } />
          <Route path="/group/:groupId" render={ props => <Group {...props} /> } />
          <Redirect from="/" to="/admin/index" />
          <Route component={() => (<div>404 Not found </div>)} />
        </Switch>
      </BrowserRouter>
      </HashRouter>
    </AuthContext.Provider>
  )
};
ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
