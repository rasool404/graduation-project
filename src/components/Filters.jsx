import React, { useState } from "react";
import { categories } from "../store";

import PropTypes from "prop-types";

const Filters = ({ state, setProducts, mode }) => {
  const [price, setPrice] = useState({ from: 0, to: handleMax(state) });
  const [category, setCategory] = useState("");
  function handleFilters(priceFrom, priceTo, category) {
    setProducts(
      state.filter((item) => {
        if (String(priceFrom).length && String(priceTo).length) {
          return (
            Number(item.price) >= Number(priceFrom) &&
            Number(item.price) <= Number(priceTo) &&
            item.category.includes(category)
          );
        } else {
          return item;
        }
      })
    );
  }

  function handleMax(state) {
    let summ = 0;
    state &&
      state.forEach((item) => {
        if (summ < item.price) {
          summ = item.price;
        }
      });
    return summ;
  }

  return (
    <>
      <div
        className="filter"
        style={
          mode
            ? {
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
              }
            : { backgroundColor: "#333", border: "1px solid white" }
        }
        data-aos="fade-right"
      >
        <h3
          className="filter__title pb-3"
          style={
            mode
              ? { color: "#000", borderBottom: "1px solid #000" }
              : { color: "#fff", borderBottom: "1px solid #fff" }
          }
        >
          Фильтры
        </h3>

        <div className="filter__body">
          <h4 style={mode ? { color: "#000" } : { color: "#fff" }}>По цене</h4>
          <div className="input-group my-3 mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="От"
              value={price.from}
              onChange={(event) =>
                setPrice({
                  ...price,
                  from: Number(event.target.value.replace(/\s+/g, ""))
                })
              }
            />
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              placeholder="До"
              value={price.to}
              onChange={(event) =>
                setPrice({
                  ...price,
                  to: Number(event.target.value.replace(/\s+/g, ""))
                })
              }
            />
          </div>
          <h4 style={mode ? { color: "#000" } : { color: "#fff" }}>
            По категориям
          </h4>
          <select
            className="form-select mt-4"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Все</option>
            {categories.map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))}
          </select>

          <button
            onClick={(e) => handleFilters(price.from, price.to, category, e)}
            className="btn btn-success mt-5"
          >
            Фильтровать
          </button>
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  state: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  mode: PropTypes.bool
};

export default Filters;
