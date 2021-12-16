import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Navbar } from "./Shared Components/Navbar/Navbar"
import { Home } from "./Components/Home/Home"
import { Authenticate } from "./Components/AuthenticateUser/Authenticate"
import { Activate } from "./Components/ActivateUser/Activate"
import { Rooms } from "./Components/Rooms/Rooms"
import { useSelector } from "react-redux"
import { useLoading } from "./hooks/useLoading"
import { Loader } from './Shared Components/Loader/Loader';
import { Chat } from './Components/Chat/Chat';

function App() {

  const { loading } = useLoading();

  return loading ? (
    <Loader message="Loading! please wait...." />
  ) : (
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
          <Rooms dm={false} />
        </Protected>
        <Protected path="/dms">
          <Rooms dm={true} />
        </Protected>
        <Protected path="/chat/:id">
          <Chat />
        </Protected>
      </Switch>
    </BrowserRouter>
  );
}

const Guest = (props) => {
  const { isAuth } = useSelector((state) => state.user)
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
  const { user, isAuth } = useSelector((state) => state.user)
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
  const { user, isAuth } = useSelector((state) => state.user)
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