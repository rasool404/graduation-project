import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourites = () => {
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
      <h1 className="text-light text-center mb-5 border-bottom border-light pb-4">
        Изранные
      </h1>
      {products.length ? (
        <div className="d-flex justify-content-between flex-wrap">
          {products.map((product, idx) => (
            <div key={idx} className="card p-3 mb-3" style={{ width: "22rem" }}>
              <Link to={`/products/${product.id}`}>
                <img src={product.img} className="card-img-top" alt="..." />
              </Link>
              <div className="card-body">
                <Link
                  to={`/products/${product.id}`}
                  className="card-title h4 text-center d-block text-dark link"
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
        <h2 className="text-light text-center">Избранных товаров нет</h2>
      )}
    </div>
  );
};

export default Favourites;
