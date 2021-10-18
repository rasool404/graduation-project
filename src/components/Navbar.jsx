import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import PropTypes from "prop-types";

const Navbar = ({ mode, setMode }) => {
  // redux
  const store = useSelector((store) => store);
  const [basket, setBasket] = useState(0);
  const [favorite, setFavorite] = useState(0);

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

  function modeColor() {
    return mode ? { color: "#000" } : { color: "#fff" };
  }
  function buttonStyles() {
    return mode
      ? { border: "3px solid black", color: "black" }
      : { border: "3px solid white", color: "white" };
  }

  return (
    <header
      className="header"
      style={
        mode
          ? {
              backgroundColor: "#F7F6F3",
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"
            }
          : {
              backgroundColor: "#373C3F",
              boxShadow:
                "rgba(238,238,238, 0.1) 0px 4px 16px, rgba(238,238,238, 0.1) 0px 8px 24px, rgba(238,238,238, 0.1) 0px 16px 56px"
            }
      }
    >
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo" data-aos="fade-up">
            <img src={logo} alt="" />
            <p style={modeColor()}>Online Store</p>
          </Link>
          <div className="header__middle" data-aos="fade-up">
            <NavLink
              to="/cart"
              className="header__cart position-relative"
              style={modeColor()}
            >
              <i className="fas fa-shopping-cart" id="cart"></i>

              {basket > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {basket}
                </span>
              ) : (
                ""
              )}
            </NavLink>

            <NavLink
              to="/favourites"
              className="header__favourites position-relative"
              style={modeColor()}
            >
              <i className="fas fa-star" id="cart"></i>

              {favorite > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {favorite}
                </span>
              ) : (
                ""
              )}
            </NavLink>
          </div>
          <div className="header__end">
            <div className="header__mode" data-aos="fade-up">
              <i
                className={`fas fa-${mode ? "moon" : "sun"}`}
                onClick={() => setMode((prev) => !prev)}
                role="button"
                style={modeColor()}
              ></i>
            </div>
            <div className="header__buttons">
              <Link
                to="/login"
                className="header__btn"
                style={buttonStyles()}
                data-aos="fade-up"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="header__btn"
                style={buttonStyles()}
                data-aos="fade-up"
              >
                Sign in
              </Link>
            </div>
            <div className="header__admin" data-aos="fade-up">
              <NavLink to="/admin">
                <i className="fas fa-user" style={modeColor()}></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  mode: PropTypes.bool,
  setMode: PropTypes.func
};
export default Navbar;
