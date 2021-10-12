import React, { useRef } from "react";
import PropTypes from "prop-types";

const Search = ({ state, setProducts }) => {
  const search = useRef("");

  function handleSearch(event) {
    search.current = event.target.value.trim();
    if (search.current) {
      setProducts(
        state.filter((item) =>
          item.name.toLowerCase().includes(search.current.toLowerCase())
        )
      );
    } else {
      setProducts(state);
    }
  }

  return (
    <div className="input-group input-group-lg mb-3">
      <span className="input-group-text" id="basic-addon1">
        <i className="fas fa-search"></i>
      </span>
      <input
        type="search"
        className="form-control form-control-dark"
        placeholder="Поиск"
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
};

Search.propTypes = {
  state: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired
};

export default Search;
