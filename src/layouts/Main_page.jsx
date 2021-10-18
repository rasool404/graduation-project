import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import Products from "../components/Products";
import Search from "../components/Search";
import Sort from "../components/Sort";
import PropTypes from "prop-types";

const Main = ({ mode }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [products, setProducts] = useState(state);

  // pagination page number
  const [changeCounter, setChangeCounter] = useState(1);

  function handleAddToFavorites(id) {
    const newState = products;
    let changeProduct = "";
    newState.forEach((product) => {
      if (product.id === id) {
        changeProduct = product;
        changeProduct.activeFavorite = !changeProduct.activeFavorite;
      }
    });
    dispatch({ type: "HANDLE_FAVORITE", payload: changeProduct });
  }

  function handleAddToBasket(id) {
    const newState = products;
    let changeProduct = "";
    newState.forEach((product) => {
      if (product.id === id) {
        changeProduct = product;
        changeProduct.activeBasket = !changeProduct.activeBasket;
      }
    });
    dispatch({ type: "HANDLE_FAVORITE", payload: changeProduct });
  }

  return (
    <div className="main-page">
      <div className="container">
        <Search
          products={products}
          setProducts={setProducts}
          state={state}
          mode={mode}
        />
        <Sort
          setChangeCounter={setChangeCounter}
          products={products}
          setProducts={setProducts}
          state={state}
          mode={mode}
        />
        <div className="main-page-main">
          {state ? (
            products.length ? (
              <>
                <Filters state={state} setProducts={setProducts} mode={mode} />
                <Products
                  changeCounter={changeCounter}
                  setChangeCounter={setChangeCounter}
                  products={products}
                  handleAddToFavorites={handleAddToFavorites}
                  handleAddToBasket={handleAddToBasket}
                  mode={mode}
                />
              </>
            ) : (
              <div
                className="mx-auto"
                data-aos="zoom-in"
                data-aos-duration="300"
                style={mode ? { color: "#000" } : { color: "#fff" }}
              >
                <h2 className="text-center my-5">Я ничего не нашёл ... :(</h2>
                <h5 className="text-center">
                  Но я смотрел везде где можно, честно! <br /> Под каждым
                  камнем, за каждым углом я искал то что <br /> Вы просили, но
                  всё тщетно ...
                </h5>
              </div>
            )
          ) : (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border text-light"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  mode: PropTypes.bool
};
export default Main;
