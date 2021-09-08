import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Navbar } from "./Shared Components/Navbar/Navbar"
import { Home } from "./Components/Home/Home"
import { Authenticate } from "./Components/AuthenticateUser/Authenticate"
import { Activate } from "./Components/ActivateUser/Activate"
import { Rooms } from "./Components/Rooms/Rooms"

const isAuth = false;
const user = {
  activate: false
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Guest path="/" exact>
          <Home />
        </Guest>
        <Guest path="/authenticate">
          <Authenticate />
        </Guest>
        <SemiProtected path="/activate">
          <Activate />
        </SemiProtected>
        <Protected path="/rooms">
          <Rooms />
        </Protected>
      </Switch>
    </BrowserRouter>
  );
}

const Guest = (props) => {
  return (
    <Route
      {...props.rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: '/rooms',
              state: { from: location },
            }}
          />
        ) : (
          props.children
        );
      }}
    ></Route>
  );
};

const SemiProtected = (props) => {
  return (
    <Route
      {...props.rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: '/rooms',
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

const Protected = (props) => {
  return (
    <Route
      {...props.rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: '/activate',
              state: { from: location },
            }}
          />
        ) : (
          props.children
        );
      }}
    ></Route>
  );
};

export default App;