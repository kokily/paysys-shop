import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_ME } from 'graphql/auth';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from 'styles';

import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import SoldierPage from 'pages/home/SoldierPage';
import ReservePage from 'pages/home/ReservePage';
import GeneralPage from 'pages/home/GeneralPage';
import ListMenuPage from 'pages/home/ListMenuPage';
import DetailMenuPage from 'pages/home/DetailMenuPage';
import CartPage from 'pages/cart/CartPage';
import ListFrontsPage from 'pages/front/ListFrontsPage';
import ReadFrontPage from 'pages/front/ReadFrontPage';
import ListUsersPage from 'pages/users/ListUsersPage';

const Routes: React.FC = () => {
  const { data, loading } = useQuery(CHECK_ME);

  if (loading) return null;

  return (
    <>
      <GlobalStyle />

      {!loading && data && data.CheckMe.user ? (
        <LogInRoutes user={data.CheckMe.user} />
      ) : (
        <LogOutRoutes />
      )}

      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

const LogInRoutes = ({ user }) => (
  <Switch>
    <Route path="/soldier" component={SoldierPage} />
    <Route path="/reserve" component={ReservePage} />
    <Route path="/general" component={GeneralPage} />
    <Route exact path="/menu" component={ListMenuPage} />
    <Route path="/menu/:menuId" component={DetailMenuPage} />
    <Route path="/cart" component={CartPage} />
    <Route path="/fronts" component={ListFrontsPage} />
    <Route path="/front/:frontId" component={ReadFrontPage} />

    {user && user.admin && <Route exact path="/users" component={ListUsersPage} />}
    <Redirect from="*" to="/soldier" />
  </Switch>
);

const LogOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
