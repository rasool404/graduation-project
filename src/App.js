import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Account from "./layouts/Account_page";
import Cart from "./layouts/Cart_page";
import Edit from "./layouts/Edit_page";
import Favourites from "./layouts/Favourites_page";
import Main from "./layouts/Main_page";
import Navbar from "./components/Navbar";
import Product from "./layouts/Product_page";
import Login from "./layouts/Login_page";
import Registration from "./layouts/Registration_page";
import AddProduct from "./layouts/Add_product_page";

import Aos from "aos";

function App() {
  useEffect(() => {
    Aos.init({
      duration: "500",
      once: true
    });
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode(false);
    } else {
      setMode(true);
    }
  }, []);

  const [mode, setMode] = React.useState();
  const authorized = true;
  return (
    <Router>
      <Navbar mode={mode} setMode={setMode} />
      <main
        style={
          mode ? { backgroundColor: "#eee" } : { backgroundColor: "#2F3437" }
        }
      >
        <Switch>
          <Route exact path="/">
            <Main mode={mode} />
          </Route>
          <Route path="/cart">
            <Cart mode={mode} />
          </Route>
          <Route path="/favourites">
            <Favourites mode={mode} />
          </Route>
          <Route path="/add-product">
            <AddProduct mode={mode} />
          </Route>
          <Route path="/products/:id">
            <Product mode={mode} />
          </Route>
          <Route path="/edit/:id">
            <Edit mode={mode} />
          </Route>
          {authorized && (
            <Route path="/admin">
              <Account mode={mode} />
            </Route>
          )}

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          {authorized ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
