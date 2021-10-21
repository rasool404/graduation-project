import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Title from "../components/Title";

const Favourites = ({ mode }) => {
  const state = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(state.filter((item) => item.activeFavorite));
  }, [state]);

  function deleteFromFavorite(id) {
    const newState = state;
    newState.forEach((product) => {
      if (product.id === Number(id)) {
        product.activeFavorite = false;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newState });
  }

  return (
    <div className="container favourites-container">
      <Title mode={mode}>Изранные</Title>
      {products.length ? (
        <div
          className="d-flex justify-content-between flex-wrap"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="card p-3 mb-3"
              style={
                mode
                  ? {
                      boxShadow:
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                      width: "22rem"
                    }
                  : {
                      backgroundColor: "#333",
                      border: "1px solid white",
                      color: "#fff",
                      width: "22rem"
                    }
              }
            >
              <Link to={`/products/${product.id}`}>
                <img src={product.img} className="card-img-top" alt="..." />
              </Link>
              <div className="card-body">
                <Link
                  to={`/products/${product.id}`}
                  className="card-title h4 text-center d-block link"
                  style={mode ? { color: "#000" } : { color: "#fff" }}
                >
                  {product.name}
                </Link>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => deleteFromFavorite(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2
          className=" text-center"
          data-aos="fade-up"
          style={mode ? { color: "#000" } : { color: "#fff" }}
        >
          Избранных товаров нет
        </h2>
      )}
    </div>
  );
};

Favourites.propTypes = {
  mode: PropTypes.bool
};

export default Favourites;
