import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './home/home-page';
import RecipeDetails from '../recipe-details';
import RegisterPage from './auth/register-page';
import RecipesPage from './recipe/recipes-page';
import LoginPage from './auth/login-page';
import AuthContext from '../context';
import ProfilePage from './profile/profile-page';
import { navigation } from '../../consts';

const RoutePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return (
      <Switch>
        {commonRoutes()}
        <Route path={navigation.profile} component={ProfilePage} exact />
        <Redirect to={navigation.home} />
      </Switch>
    );
  }

  return (
    <Switch>
      {commonRoutes()}
      <Route path={navigation.register} component={RegisterPage} />
      <Route path={navigation.login} component={LoginPage} />
      <Redirect to={navigation.home} />
    </Switch>
  );
};

const commonRoutes = () => {
  return <Fragment>
    <Route path={navigation.home} component={HomePage} exact />
    <Route path={navigation.recipes} component={RecipesPage} exact />
    <Route path={navigation.recipe} component={RecipeDetails} />
  </Fragment>
}

export default RoutePage;
