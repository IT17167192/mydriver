import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticate} from "./auth-service";
import * as Constants from '../../Constants';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticate() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: Constants.ROUTES.sign_in, state: {from: props.location}}} />
    )}/>
);

export default PrivateRoute;
