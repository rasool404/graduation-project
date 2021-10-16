import React from "react";
import PropTypes from "prop-types";

const Sort = ({ products, setProducts, state, setChangeCounter }) => {
  function handleSort(nameSort) {
    const saveProducts = [...products];
    switch (nameSort) {
      case "highToLow":
        saveProducts.sort((a, b) => b.price - a.price);
        setProducts(saveProducts);
        setChangeCounter(1);
        break;
      case "lowToHigh":
        saveProducts.sort((a, b) => a.price - b.price);
        setProducts(saveProducts);
        setChangeCounter(1);
        break;
      case "latest":
        saveProducts.reverse();
        setProducts(saveProducts);
        setChangeCounter(1);
        break;
      default:
        setProducts(state);
        setChangeCounter(1);
    }
  }

  return (
    <>
      <div className="sort">
        <h4 className="text-white text-center" data-aos="fade-down-left">
          Сортировка
        </h4>
        <div className="d-flex justify-content-between flex-wrap mt-3">
          <button
            data-aos="fade-right"
            type="button"
            className="btn btn-primary me-2 mt-1"
            onClick={() => handleSort("highToLow")}
          >
            Самые дорогие
          </button>
          <button
            data-aos="fade-down-right"
            data-aos-delay="300"
            type="button"
            className="btn btn-info me-2 mt-1"
            onClick={() => handleSort("")}
          >
            По умолчанию
          </button>
          <button
            data-aos="fade-down-left"
            data-aos-delay="300"
            type="button"
            className="btn btn-success me-2 mt-1"
            onClick={() => handleSort("latest")}
          >
            Самые свежие
          </button>
          <button
            type="button"
            data-aos="fade-left"
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
  state: PropTypes.array.isRequired,
  setChangeCounter: PropTypes.func
};

export default Sort;
