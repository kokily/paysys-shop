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
import ReadUserPage from 'pages/users/ReadUserPage';
import ListItemsPage from 'pages/items/ListItemsPage';
import ReadItemPage from 'pages/items/ReadItemPage';
import AddItemPage from 'pages/items/AddItemPage';
import UpdateItemPage from 'pages/items/UpdateItemPage';
import ListWeddingsPage from 'pages/weddings/ListWeddingsPage';
import ReadWeddingPage from 'pages/weddings/ReadWeddingPage';
import ExpenseWeddingPage from 'pages/weddings/ExpenseWeddingPage';
import UpdateWeddingPage from 'pages/weddings/UpdateWeddingPage';
import PasswordPage from 'pages/auth/PasswordPage';

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

      <ToastContainer position="top-center" draggable={false} />
    </>
  );
};

const LogInRoutes = ({ user }) => (
  <Switch>
    <Route exact path="/" component={SoldierPage} />
    <Route exact path="/soldier" component={SoldierPage} />
    <Route exact path="/reserve" component={ReservePage} />
    <Route exact path="/general" component={GeneralPage} />
    <Route exact path="/menu" component={ListMenuPage} />
    <Route path="/menu/:menuId" component={DetailMenuPage} />
    <Route exact path="/cart" component={CartPage} />
    <Route exact path="/fronts" component={ListFrontsPage} />
    <Route path="/front/:frontId" component={ReadFrontPage} />
    <Route exact path="/password" component={PasswordPage} />

    {user && user.admin && (
      <>
        <Route exact path="/users" component={ListUsersPage} />
        <Route path="/user/:userId" component={ReadUserPage} />
        <Route exact path="/items" component={ListItemsPage} />
        <Route exact path="/item/:itemId" component={ReadItemPage} />
        <Route path="/add" component={AddItemPage} />
        <Route path="/item/update/:itemId" component={UpdateItemPage} />
        <Route exact path="/weddings" component={ListWeddingsPage} />
        <Route exact path="/wedding/:weddingId" component={ReadWeddingPage} />
        <Route exact path="/expense" component={ExpenseWeddingPage} />
        <Route path="/wedding/update/:weddingId" component={UpdateWeddingPage} />
      </>
    )}

    <Redirect from={'*'} to={'/soldier'} />
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
