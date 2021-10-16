import React, { useEffect, useState } from "react";
import Product from "./Product";
import PropTypes from "prop-types";

const Products = ({
  products,
  handleAddToFavorites,
  handleAddToBasket,
  setChangeCounter,
  changeCounter
}) => {
  const [newProducts, setNewProducts] = useState();

  const counterPagination = 2;
  const startCounterPagination = -1;
  const lengthPagination = fillArray(
    Math.ceil(products.length / counterPagination)
  );

  useEffect(() => {
    setNewProducts(
      products.slice(
        (startCounterPagination + changeCounter) * counterPagination,
        counterPagination * changeCounter
      )
    );
    if (
      products.slice(
        (startCounterPagination + changeCounter) * counterPagination,
        counterPagination * changeCounter
      ) <
      changeCounter * counterPagination
    ) {
      setChangeCounter(1);
    }
  }, [changeCounter, products, startCounterPagination, setChangeCounter]);

  function fillArray(num) {
    const newArr = [];
    for (let i = 1; i <= num; i++) {
      newArr.push(i);
    }
    return newArr;
  }

  function incPage() {
    setChangeCounter((prev) => prev + 1);
  }
  function decrPage() {
    if (changeCounter > 1) {
      setChangeCounter((prev) => prev - 1);
    }
  }

  function handleChangePage(item) {
    setChangeCounter(item);
  }

  return (
    <div>
      {newProducts && (
        <div className="products d-flex flex-wrap justify-content-center mt-3">
          {newProducts.map((product) => {
            return (
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                img={product.img}
                description={product.description}
                count={product.count}
                activeBasket={product.activeBasket}
                activeFavorite={product.activeFavorite}
                id={product.id}
                handleAddToFavorites={handleAddToFavorites}
                handleAddToBasket={handleAddToBasket}
                category={product.category}
              />
            );
          })}
          {lengthPagination.length > 1 && (
            <nav className="my-5">
              <ul className="pagination pagination-lg justify-content-center">
                <li className="page-item" onClick={() => decrPage()}>
                  <div className="page-link">
                    <span>&laquo;</span>
                  </div>
                </li>
                {lengthPagination.map((i) => (
                  <li
                    key={i}
                    className={`page-item  ${
                      i === changeCounter ? "active" : ""
                    }`}
                    onClick={() => handleChangePage(i)}
                  >
                    <div className="page-link">{i}</div>
                  </li>
                ))}
                <li className="page-item" onClick={() => incPage()}>
                  <div className="page-link">
                    <span>&raquo;</span>
                  </div>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
  handleAddToBasket: PropTypes.func.isRequired,
  setChangeCounter: PropTypes.func,
  changeCounter: PropTypes.number
};

export default Products;
