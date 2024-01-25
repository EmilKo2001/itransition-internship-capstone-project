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
import Collection from "./pages/Collection/Collection";
import Collections from "./pages/Collections/Collections";
import Items from "./pages/Items/Items";
import Item from "./pages/Item/Item";
import ItemEdit from "./pages/ItemEdit/ItemEdit";

import "./global.css";

function App() {
  const { token } = useContext(Context);

  return (
    <Router>
      <Header />
      <main className="pt-8 lg:pt-28">
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/collections" exact>
            <Collections />
          </Route>
          <Route path="/collections/:slug" exact>
            <Collection type="page" />
          </Route>
          <Route path="/collections/:collection/:slug" exact>
            <Item type={token ? "authed" : ""} />
          </Route>
          <Route path="/admin/collections/:collection/:slug/edit" exact>
            <ItemEdit />
          </Route>
          <Route path="/items" exact>
            <Items />
          </Route>
          <Route path="/register" exact>
            {token ? <Homepage /> : <Register />}
          </Route>
          <Route path="/login" exact>
            {token ? <Homepage /> : <Login />}
          </Route>
          <Route path="/admin/collections-new" exact>
            {token ? <CollectionCreate /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug/edit" exact>
            {token ? <CollectionEdit /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug/create" exact>
            {token ? <ItemCreate /> : <Login />}
          </Route>
          <Route path="/admin/collections/:slug" exact>
            {token ? <Collection /> : <Login />}
          </Route>
          <Route path="/admin" exact>
            {token ? <Admin /> : <Login />}
          </Route>
          <Route path="*">
            <h1 className="text-center text-xl lg:text-4xl">404 - Not Found</h1>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
