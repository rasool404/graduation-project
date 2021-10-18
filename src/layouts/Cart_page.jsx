import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Title from "../components/Title";

const Cart = ({ mode }) => {
  const [products, setProducts] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setProducts(state.filter((item) => item.activeBasket));
  }, [state]);

  const count = handleCounterCount();
  const total = handleCounterTotal();

  function handleConfirm() {
    if (products.length) {
      const newState = state;
      newState.forEach((product) => {
        product.count = 1;
        product.activeBasket = false;
      });
      dispatch({ type: "CHANGE_STATE", payload: newState });
      setConfirm(true);
    }
  }

  function deleteFromBasket(id) {
    const newState = state;
    newState.forEach((product) => {
      if (product.id === Number(id)) {
        product.activeBasket = !product.activeBasket;
        product.count = 1;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  function handleAddToFavorites(id) {
    const newState = state;
    let changeProduct = "";
    newState.forEach((product) => {
      if (product.id === id) {
        changeProduct = product;
        changeProduct.activeFavorite = !changeProduct.activeFavorite;
      }
    });
    dispatch({ type: "HANDLE_FAVORITE", payload: changeProduct });
  }

  function increaseProductCount(id) {
    const newState = state;
    newState.forEach((product) => {
      if (product.id === Number(id)) {
        product.count++;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  function decreaseProductCount(id) {
    const newState = state;
    newState.forEach((product) => {
      if (product.id === Number(id)) {
        if (product.count > 1) {
          product.count--;
        }
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  function handleCounterCount() {
    let counter = 0;
    state.forEach((el) => {
      if (el.activeBasket) {
        counter += el.count;
      }
    });
    return counter;
  }

  function handleCounterTotal() {
    let total = 0;
    state.forEach((el) => {
      if (el.activeBasket) {
        total += el.price * el.count;
      }
    });
    return total;
  }

  function textColor() {
    return mode ? { color: "#000" } : { color: "#fff" };
  }
  function textColorListItem() {
    return mode
      ? { color: "#000" }
      : { color: "#fff", backgroundColor: "#333", borderColor: "#fff" };
  }

  return (
    <>
      <div className="cart-container container">
        <Title mode={mode}>Корзина</Title>
        {products.length ? (
          <div className="container">
            {products.map((product, idx) => {
              return (
                <div
                  className="cart-product"
                  key={idx}
                  data-aos="zoom-in"
                  style={
                    mode
                      ? {
                          boxShadow:
                            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        }
                      : {
                          backgroundColor: "#333",
                          border: "1px solid white",
                          color: "#fff"
                        }
                  }
                >
                  <div className="cart-product__img">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.img} alt="" />
                    </Link>
                  </div>
                  <div className="cart-product__body">
                    <div className="cart-product__info">
                      <h4>
                        <Link
                          to={`/products/${product.id}`}
                          style={textColor()}
                        >
                          {product.name}
                        </Link>
                      </h4>
                      <h6>
                        <Link
                          to={`/products/${product.id}`}
                          style={textColor()}
                        >
                          ID: <strong>{product.id}</strong>
                        </Link>
                      </h6>
                      <p style={textColor()}>
                        Категория: <strong>{product.category}</strong>{" "}
                      </p>
                      <h5 style={textColor()}>
                        Стоимость: &nbsp;
                        <strong>
                          {(product.price * product.count).toLocaleString("ru")}
                        </strong>{" "}
                        ₽
                      </h5>
                      <h5 style={textColor()} className="mb-5 mt-3">
                        <button
                          onClick={() =>
                            decreaseProductCount(product.id, state, dispatch)
                          }
                          type="button"
                          className="btn btn-secondary btn-sm mx-2"
                        >
                          -
                        </button>
                        <strong>{product.count}</strong>
                        <button
                          onClick={() =>
                            increaseProductCount(product.id, state, dispatch)
                          }
                          type="button"
                          className="btn btn-secondary btn-sm ms-2"
                        >
                          +
                        </button>
                      </h5>
                      <button
                        type="button"
                        className={`btn btn-${
                          product.activeFavorite ? "danger" : "warning"
                        }`}
                        onClick={() => handleAddToFavorites(product.id)}
                      >
                        {product.activeFavorite
                          ? "Удалить из избранного"
                          : "Добавить в избранное"}
                        <span className="badge">
                          <i
                            className={`fas fa-star ${
                              product.activeFavorite
                                ? "text-light"
                                : "text-dark"
                            }`}
                          ></i>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn-close"
                        style={
                          mode
                            ? {}
                            : {
                                backgroundColor: "#fff"
                              }
                        }
                        onClick={() => deleteFromBasket(product.id)}
                      ></button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="card card-cart text-center"
              data-aos="zoom-in"
              style={
                mode
                  ? {
                      boxShadow:
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                    }
                  : {
                      backgroundColor: "#333",
                      border: "1px solid white",
                      color: "#fff"
                    }
              }
            >
              <div className="card-header" style={textColor()}>
                Оформление заказа
              </div>
              <ul className="list-group p-4">
                <li className="list-group-item" style={textColorListItem()}>
                  Итого: <strong>{count}</strong>
                </li>
                <li className="list-group-item" style={textColorListItem()}>
                  Итоговая сумма: &nbsp;
                  <strong>{total.toLocaleString("ru")}</strong> ₽
                </li>
              </ul>
              <button
                type="button"
                className={`btn btn-${confirm ? "success" : "primary"}`}
                onClick={handleConfirm}
                style={{ width: "100%" }}
              >
                {confirm ? "Заказ успешно оформлен" : "Оформить заказ"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {confirm ? (
              <h2 className="text-center text-success" data-aos="zoom-out">
                Заказ успешно оформлен!
              </h2>
            ) : (
              <>
                <h2
                  className="text-center"
                  style={textColor()}
                  data-aos="fade-up"
                >
                  Корзина пустая
                </h2>
                <Link
                  to="/"
                  className=" text-center link d-inline-block"
                  data-aos="fade-up-right"
                  style={textColor()}
                >
                  Добавить первый товар{" "}
                  <span className="badge">
                    <i
                      className="fas fa-external-link-alt"
                      style={textColor()}
                    ></i>
                  </span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

Cart.propTypes = {
  mode: PropTypes.bool
};
export default Cart;
