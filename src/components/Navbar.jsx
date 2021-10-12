import React, { useEffect, useState } from "react";
import { Tooltip } from "reactstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  // redux
  const store = useSelector((store) => store);
  const [basket, setBasket] = useState(0);
  const [favorite, setFavorite] = useState(0);

  const [tooltipCart, setTooltipCart] = useState(false);
  const [tooltipFavourites, setTooltipFavourites] = useState(false);
  const [tooltipProfile, setTooltipProfile] = useState(false);

  const toggleCartTooltip = () => setTooltipCart(!tooltipCart);
  const toggleFavouritesTooltip = () =>
    setTooltipFavourites(!tooltipFavourites);
  const toggleProfileTooltip = () => setTooltipProfile(!tooltipProfile);

  useEffect(() => {
    let bsk = 0;
    let fv = 0;
    store.forEach((item) => {
      if (item.activeBasket) {
        bsk++;
      }
      if (item.activeFavorite) {
        fv++;
      }
    });
    setBasket(bsk);
    setFavorite(fv);
  }, [store]);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 fixed-top">
      <Link
        to="/"
        className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none header-title"
      >
        <img src={logo} alt="Logo" className="header-logo" />
        <strong>Online Store</strong>
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link
            to="/cart"
            className="nav-link px-2 link-light position-relative"
          >
            <i className="fas fa-shopping-cart" id="cart"></i>

            <Tooltip
              placement="left"
              isOpen={tooltipCart}
              target="cart"
              toggle={toggleCartTooltip}
            >
              Корзина
            </Tooltip>
            {basket > 0 ? (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {basket}
              </span>
            ) : (
              ""
            )}
          </Link>
        </li>
        <li className="px-2 nav-link text-light position-relative">|</li>
        <li>
          <Link
            to="/favourites"
            className="nav-link px-2 link-light position-relative"
          >
            <i className="fas fa-star" id="favourites"></i>

            <Tooltip
              placement="right"
              isOpen={tooltipFavourites}
              target="favourites"
              toggle={toggleFavouritesTooltip}
            >
              Изранные
            </Tooltip>

            {favorite > 0 ? (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {favorite}
              </span>
            ) : (
              ""
            )}
          </Link>
        </li>
      </ul>

      <div className="col-md-3 text-end">
        <Link to="/login" className="btn btn-outline-light me-2">
          Войти
        </Link>
        <Link to="/registration" className="btn btn-warning me-2">
          Зарегистрироваться
        </Link>
        <Link
          to="/admin"
          className="btn text-light"
          style={{ outline: "none!important" }}
        >
          <i className="fas fa-user" id="profile"></i>
          <Tooltip
            placement="bottom"
            isOpen={tooltipProfile}
            target="profile"
            toggle={toggleProfileTooltip}
          >
            Профиль
          </Tooltip>
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
