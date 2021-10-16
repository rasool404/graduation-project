import React, { useState } from "react";
import { categories } from "../store";
import { handleMax } from "../utils";
import PropTypes from "prop-types";

const Filters = ({ state, setProducts }) => {
  const [price, setPrice] = useState({ from: 0, to: handleMax(state) });
  const [category, setCategory] = useState("");
  function handleFilters(priceFrom, priceTo, category) {
    setProducts(
      state.filter((item) => {
        if (String(priceFrom).length && String(priceTo).length) {
          return (
            item.price >= Number(priceFrom) &&
            item.price <= Number(priceTo) &&
            item.category.includes(category)
          );
        } else {
          return item;
        }
      })
    );
  }

  return (
    <>
      <div className="card card-filter p-3 mt-3 me-3" data-aos="flip-right">
        <div className="card-body">
          <h4 className="card-title border-bottom pb-3">Фильтры</h4>
        </div>

        <h4>По цене</h4>
        <div className="input-group my-3 mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="От"
            value={price.from}
            onChange={(event) =>
              setPrice({ ...price, from: event.target.value })
            }
          />
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            placeholder="До"
            value={price.to}
            onChange={(event) => setPrice({ ...price, to: event.target.value })}
          />
        </div>
        <h4>По категориям</h4>
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
          className="btn btn-outline-success mt-5"
        >
          Фильтровать
        </button>
      </div>
    </>
  );
};

Filters.propTypes = {
  state: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired
};

export default Filters;
