import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { decreaseProductCount, increaseProductCount } from "../utils";

const Product = () => {
  const { id } = useParams();
  const store = useSelector((store) => store);
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setProduct(store.filter((item) => item.id === Number(id)));
  }, [id, store]);

  function handleAddToBasket(id) {
    const newState = store;
    newState.forEach((product) => {
      if (product.id === Number(id)) {
        product.activeBasket = !product.activeBasket;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  function handleAddToFavorites(id) {
    const newState = store;
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
    <div className="container product-page">
      {product.length ? (
        <>
          <nav aria-label="breadcrumb" data-aos="fade-up">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-dark link">
                  Главная
                </Link>
              </li>
              <li className="breadcrumb-item">
                <p className="text-dark">{product[0].category}</p>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <p className="text-dark">{product[0].name}</p>
              </li>
            </ol>
          </nav>
          <div className="product mb-5" data-aos="fade-up">
            <img
              src={product[0].img}
              alt=""
              className="product__img"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
            <div className="product__body">
              <h1 className="my-5" data-aos="fade-up" data-aos-duration="600">
                {product[0].name}
              </h1>
              <h4 className="my-5" data-aos="fade-up" data-aos-duration="800">
                {product[0].description}
              </h4>
              <h4 className="my-5" data-aos="fade-up">
                Цена: <strong>{product[0].price * product[0].count}</strong> ₽
              </h4>
              <p className="fs-3">
                <button
                  data-aos="zoom-in"
                  onClick={() =>
                    decreaseProductCount(product[0].id, store, dispatch)
                  }
                  type="button"
                  className="btn btn-secondary btn-sm mx-2 fs-3 p-3"
                >
                  -
                </button>
                <strong data-aos="fade-up" className="mx-3">
                  {product[0].count}
                </strong>
                <button
                  data-aos="zoom-in"
                  onClick={() =>
                    increaseProductCount(product[0].id, store, dispatch)
                  }
                  type="button"
                  className="btn btn-secondary btn-sm ms-2 fs-3 p-3"
                >
                  +
                </button>
              </p>
              {product[0].activeBasket ? (
                <div
                  className="product__button text-danger fw-bold"
                  onClick={() => handleAddToBasket(product[0].id)}
                >
                  Удалить с корзины
                </div>
              ) : (
                <Link
                  to="/cart"
                  onClick={() => handleAddToBasket(product[0].id)}
                  className="product__button fw-bold"
                >
                  Купить
                </Link>
              )}

              <div
                data-aos="zoom-in"
                data-aos-delay="200"
                onClick={() => handleAddToFavorites(product[0].id)}
                className="product__favourite"
              >
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="product__id" data-aos="fade-up">
              ID: <strong>{product[0].id}</strong>
            </div>
          </div>
        </>
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
  );
};
export default Product;
