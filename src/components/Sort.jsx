import React from "react";
import PropTypes from "prop-types";

const Sort = ({ products, setProducts, state }) => {
  function handleSort(nameSort) {
    const saveProducts = [...products];
    switch (nameSort) {
      case "highToLow":
        saveProducts.sort((a, b) => b.price - a.price);
        setProducts(saveProducts);
        break;
      case "lowToHigh":
        saveProducts.sort((a, b) => a.price - b.price);
        setProducts(saveProducts);
        break;
      case "latest":
        saveProducts.reverse();
        setProducts(saveProducts);
        break;
      default:
        setProducts(state);
    }
  }

  return (
    <>
      <div className="sort">
        <h4 className="text-white text-center">Сортировка</h4>
        <div className="d-flex justify-content-between flex-wrap mt-3">
          <button
            type="button"
            className="btn btn-primary me-2 mt-1"
            onClick={() => handleSort("highToLow")}
          >
            Самые дорогие
          </button>
          <button
            type="button"
            className="btn btn-info me-2 mt-1"
            onClick={() => handleSort("")}
          >
            По умолчанию
          </button>
          <button
            type="button"
            className="btn btn-success me-2 mt-1"
            onClick={() => handleSort("latest")}
          >
            Самые свежие
          </button>
          <button
            type="button"
            className="btn btn-secondary me-2 mt-1"
            onClick={() => handleSort("lowToHigh")}
          >
            Самые дешевые
          </button>
        </div>
      </div>
    </>
  );
};

Sort.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  state: PropTypes.array.isRequired
};

export default Sort;
