import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleCounterCount,
  handleCounterTotal,
  increaseProductCount,
  decreaseProductCount
} from "../utils";

const Cart = () => {
  //hooks
  const [products, setProducts] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    setProducts(state.filter((item) => item.activeBasket));
  }, [state]);

  // const

  const count = handleCounterCount(state);
  const total = handleCounterTotal(state);

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

  return (
    <>
      <div className="cart-container">
        <h1 className="text-light text-center mb-5 border-bottom border-light pb-4">
          Корзина
        </h1>
        {products.length ? (
          <>
            {products.map((product, idx) => {
              return (
                <div key={idx} className="cart-item mb-3">
                  <div className="cart-item-body">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.img}
                        className="cart-item-img"
                        alt="..."
                      />
                    </Link>
                    <div className="cart-item-info">
                      <div className="cart-item-info-name">
                        <p>
                          <Link
                            to={`/products/${product.id}`}
                            className="text-dark link"
                          >
                            <strong>{product.name}</strong>
                          </Link>
                        </p>
                        <p>
                          <Link
                            to={`/products/${product.id}`}
                            className="text-dark link"
                          >
                            ID: <strong>{product.id}</strong>
                          </Link>
                        </p>
                        <p>
                          Категория: <strong>{product.category}</strong>
                        </p>
                      </div>
                      <div className="cart-item-info-count">
                        <p>
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
                        </p>
                      </div>
                      <div className="cart-item-info-price">
                        <p>
                          <strong>{product.price * product.count}</strong> ₽
                        </p>
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
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => deleteFromBasket(product.id)}
                      ></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {confirm ? (
              <h2 className="text-center text-success">
                Заказ успешно оформлен!
              </h2>
            ) : (
              <>
                <h2 className="text-center text-light">Корзина пустая</h2>
                <Link to="/" className="text-light text-center link">
                  Добавить первый товар{" "}
                  <span className="badge">
                    <i className="fas fa-external-link-alt"></i>
                  </span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="card card-cart text-center">
        <div className="card-header">Оформление заказа</div>
        <ul className="list-group p-4">
          <li className="list-group-item">
            Итого: <strong>{count}</strong>
          </li>
          <li className="list-group-item">
            Итоговая сумма: <strong>{total}</strong> ₽
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
    </>
  );
};

export default Cart;
