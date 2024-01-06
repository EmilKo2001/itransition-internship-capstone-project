import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";

import { Context } from "./context/Context";

import Header from "./components/Header";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

import "./global.css";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/posts">
            <Homepage />
          </Route>
          <Route path="/register">{user ? <Homepage /> : <Register />}</Route>
          <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
          <Route path="/post/:id">
            <Single />
          </Route>
          <Route path="/write">{user ? <Write /> : <Login />}</Route>
          <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
