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
  category
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
    <div className="card mb-4 product-card">
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/products/${id}`}>
            <img src={img} style={{ maxWidth: "380px" }} alt="img" />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link
                className="card-title text-dark link"
                to={`/products/${id}`}
              >
                {name}
              </Link>
            </h5>
            <p className="card-text">{description}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-4">
                ЦЕНА: <strong>{price}</strong> ₽
              </li>
              <li className="list-group-item mb-4">
                <Link to={`/products/${id}`} className="text-dark link">
                  ID ТОВАРА: <strong>{id}</strong>
                </Link>
              </li>
              <li className="list-group-item mb-4">
                КАТЕГОРИЯ: <strong>{category}</strong>
              </li>
              <li className="list-group-item mb-4">
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
              </li>
              <li className="list-group-item row">
                <button
                  onClick={() => handleAddToBasket(id)}
                  className={`btn btn-${activeBasket ? "danger" : "primary"}`}
                >
                  {activeBasket ? "Удалить из корзины" : "Добавить в корзину"}
                  <span className="badge">
                    <i
                      className={`fas fa-${
                        activeBasket ? "times" : "shopping-cart"
                      }`}
                    ></i>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddToFavorites(id)}
                  className={`btn btn-${
                    activeFavorite ? "danger" : "warning"
                  } mt-3`}
                >
                  {activeFavorite
                    ? "Удалить из избранного"
                    : "Добавить в избранное"}
                  <span className="badge">
                    <i
                      className={`fas fa-star ${
                        activeFavorite ? "text-light" : "text-dark"
                      }`}
                    ></i>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
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
  category: PropTypes.string
};

export default Product;
