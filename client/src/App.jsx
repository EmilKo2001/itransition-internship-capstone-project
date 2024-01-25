import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";

import { Context } from "./context/Context";

import Header from "./components/Header";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import CollectionCreate from "./pages/CollectionCreate/CollectionCreate";
import CollectionEdit from "./pages/CollectionEdit/CollectionEdit";
import ItemCreate from "./pages/ItemCreate/ItemCreate";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Collection from "./pages/Collection/Collection";
import Collections from "./pages/Collections/Collections";
import Items from "./pages/Items/Items";

import "./global.css";

function App() {
  const { token } = useContext(Context);

  return (
    <Router>
      <Header />
      <main className="pt-8 lg:pt-28">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/collections" exact>
            <Collections />
          </Route>
          <Route path="/collections/:slug">
            <Collection type="page" />
          </Route>
          <Route path="/items" exact>
            <Items />
          </Route>
          <Route path="/register">{token ? <Homepage /> : <Register />}</Route>
          <Route path="/login">{token ? <Homepage /> : <Login />}</Route>
          <Route path="/post/:id">
            <Single />
          </Route>
          <Route path="/write">{token ? <Write /> : <Login />}</Route>
          <Route path="/admin/collections-new">
            {token ? <CollectionCreate /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug/edit" exact>
            {token ? <CollectionEdit /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug/create" exact>
            {token ? <ItemCreate /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug">
            {token ? <Collection /> : <Login />}
          </Route>
          <Route path="/admin">{token ? <Admin /> : <Login />}</Route>
          <Route path="*">
            <h1 className="text-center text-xl lg:text-4xl">404</h1>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
