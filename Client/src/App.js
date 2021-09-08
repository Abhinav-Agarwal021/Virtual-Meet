import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar } from "./Shared Components/Navbar/Navbar"
import { Home } from "./Components/Home/Home"
import { Register } from "./Components/Register/Register"
import { Login } from "./Components/Login/Login"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;