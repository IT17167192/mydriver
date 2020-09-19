import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/Auth/SignIn";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import * as Constant from './Constants';

const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path={Constant.ROUTES.sign_in} exact component={SignIn}/>
          <PrivateRoute path={Constant.ROUTES.dashboard} exact component={Dashboard}/>
          <PrivateRoute path={Constant.ROUTES.uploader} exact component={Dashboard}/>
          <PrivateRoute path={Constant.ROUTES.previewer} exact component={Dashboard}/>
        </Switch>
      </BrowserRouter>
  );
};

export default Routes;
