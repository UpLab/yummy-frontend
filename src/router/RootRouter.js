import { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RecipeDetails from '../pages/RecipeDetails';
import HooksDemo from '../pages/HooksDemo';
import AuthLayout from '../components/layouts/AuthLayout';
import paths from './paths';
import AppLayout from '../components/layouts/AppLayout';
import AuthManager from '../services/AuthManager';

const authRoutes = [
  {
    path: paths.login,
    Component: Login,
    exact: true,
  },
  {
    path: paths.signUp,
    Component: SignUp,
    exact: true,
  },
  {
    path: paths.hooksDemo,
    Component: HooksDemo,
    exact: true,
  },
];

const appRoutes = [
  {
    path: paths.myRecipes,
    Component: Home,
    exact: true,
  },
  {
    path: paths.recipeDetails,
    Component: RecipeDetails,
    exact: true,
  },
];

export default class RootRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: AuthManager.isLoggedIn(),
    };
  }

  componentDidMount() {
    this.unsubscribeFromLoginStatusChange = AuthManager.onLoginStatusChange(
      (token) => {
        this.setState({ loggedIn: !!token });
      }
    );
    this.unsubscribeFromOnLogin = AuthManager.onLogin(() => {
      console.log('User was logged in!');
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromLoginStatusChange();
    this.unsubscribeFromOnLogin();
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <Router>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        {loggedIn ? (
          <AppLayout>
            <Switch>
              {appRoutes.map(({ path, Component: C, exact }) => (
                <Route key={path} exact={exact} path={path}>
                  <C />
                </Route>
              ))}
              <Redirect to={paths.myRecipes} />
            </Switch>
          </AppLayout>
        ) : (
          <AuthLayout login={this.login}>
            <Switch>
              {authRoutes.map(({ path, Component: C, exact }) => (
                <Route key={path} exact={exact} path={path}>
                  <C />
                </Route>
              ))}
              <Redirect to={paths.login} />
            </Switch>
          </AuthLayout>
        )}
      </Router>
    );
  }
}
