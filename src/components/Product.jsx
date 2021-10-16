import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const Product = ({
  name,
  price,
  img,
  description,
  count,
  activeBasket,
  activeFavorite,
  id,
  handleAddToFavorites,
  handleAddToBasket,
  category,
  mode
}) => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  function increaseProductCount(id) {
    const newState = store;
    newState.forEach((product) => {
      if (product.id === +id) {
        product.count++;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  function decreaseProductCount(id) {
    const newState = store;
    newState.forEach((product) => {
      if (product.id === +id) {
        if (product.count > 1) {
          product.count--;
        }
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }
  return (
    <div
      className="product-block"
      data-aos="zoom-in-left"
      data-aos-duration="300"
      style={
        mode
          ? {
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
            }
          : {
              backgroundColor: "#333",
              border: "1px solid white",
              color: "#fff"
            }
      }
    >
      <Link to={`/products/${id}`} className="product-block__img">
        <img src={img} alt="" />
      </Link>
      <div className="product-block__body">
        <Link
          to={`/products/${id}`}
          className="product-block__title"
          style={mode ? {} : { color: "#fff" }}
        >
          {name}
        </Link>
        <p className="product-block__description">{description}</p>
        <p className="product-block__price">
          ЦЕНА: <strong>{price}</strong> ₽
        </p>
        <Link
          to={`/products/${id}`}
          className="product-block__id"
          style={mode ? {} : { color: "#fff" }}
        >
          ID ТОВАРА: <strong>{id}</strong>
        </Link>
        <p className="product-block__category">
          КАТЕГОРИЯ: <strong>{category}</strong>
        </p>
        <p>
          КОЛИЧЕСТВО:
          <button
            onClick={() => decreaseProductCount(id)}
            type="button"
            className="btn btn-secondary btn-sm mx-2"
          >
            -
          </button>
          <strong>{count}</strong>
          <button
            onClick={() => increaseProductCount(id)}
            type="button"
            className="btn btn-secondary btn-sm ms-2"
          >
            +
          </button>
        </p>
        <p className="product-block__buttons">
          <button
            onClick={() => handleAddToBasket(id)}
            className={`btn btn-${activeBasket ? "danger" : "primary"}`}
          >
            {activeBasket ? "Удалить из корзины" : "Добавить в корзину"}
            <span className="badge">
              <i
                className={`fas fa-${activeBasket ? "times" : "shopping-cart"}`}
              ></i>
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleAddToFavorites(id)}
            className={`btn btn-${activeFavorite ? "danger" : "warning"} `}
          >
            {activeFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            <span className="badge">
              <i
                className={`fas fa-star ${
                  activeFavorite ? "text-light" : "text-dark"
                }`}
              ></i>
            </span>
          </button>
        </p>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
  description: PropTypes.string,
  count: PropTypes.number,
  activeBasket: PropTypes.bool.isRequired,
  activeFavorite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
  handleAddToBasket: PropTypes.func.isRequired,
  category: PropTypes.string,
  mode: PropTypes.bool
};

export default Product;
