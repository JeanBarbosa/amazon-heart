import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';

import { Profile } from '../pages/Profile';
import { Dashboard } from '../pages/Dashboard';
import { Maps } from '../pages/Maps';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/maps" component={Maps} isPrivate />
    </Switch>
  );
};

export default Routes;
