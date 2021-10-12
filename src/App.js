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

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/favourites">
          <Favourites />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/admin">
          <Account />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
