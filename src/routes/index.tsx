import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      {/* <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} /> */}

    </Switch>
  );
};

export default Routes;
