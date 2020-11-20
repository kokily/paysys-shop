import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_ME } from 'graphql/auth';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from 'styles';

import LoginPage from 'pages/auth/LoginPage';
import SoldierPage from 'pages/home/SoldierPage';

const Routes: React.FC = () => {
  const { data, loading } = useQuery(CHECK_ME);

  if (loading) return null;

  return (
    <>
      <GlobalStyle />

      {!loading && data.CheckMe.user ? <LogInRoutes user={data.CheckMe.user} /> : <LogOutRoutes />}

      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

const LogInRoutes = ({ user }) => (
  <Switch>
    <Route path="/soldier" component={SoldierPage} />
    <Redirect from="*" to="/soldier" />
  </Switch>
);

const LogOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
