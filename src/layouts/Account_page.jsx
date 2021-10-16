import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const Account = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [products, setProducts] = useState(
    state.sort((a, b) => Number(a.id) - Number(b.id))
  );

  function handleDelete(id) {
    if (window.confirm("Вы действительно хотите удалить?")) {
      let newProducts = products;
      newProducts = newProducts.filter((item) => item.id !== id);
      setProducts(newProducts);
      dispatch({ type: "CHANGE_STATE", payload: newProducts });
    }
  }

  return (
    <div className="container account-page">
      <h1
        className="text-light text-center mb-5 border-bottom border-light pb-4"
        data-aos="fade-up"
      >
        Профиль
      </h1>

      <Search state={state} setProducts={setProducts} />
      {products.length ? (
        <>
          <div className="account-page-products-list">
            <table
              className="table table-light table-striped  table-bordered"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Категория</th>
                  <th scope="col">Цена</th>
                  <th scope="col">Фото</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>
                        <Link
                          className="text-dark link"
                          to={`/products/${product.id}`}
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.price} ₽</td>
                      <td className="table-img">
                        <a
                          className="text-dark link"
                          href={product.img}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Фото{" "}
                          <span className="badge text-dark">
                            <i className="fas fa-external-link-alt"></i>
                          </span>
                        </a>
                        <div className="table-img-preview">
                          <img src={product.img} alt="" />
                        </div>
                      </td>
                      <td className="text-center">
                        <Link to={`/edit/${product.id}`}>
                          <span className="badge text-dark rounded-pill bg-warning p-3 mx-2">
                            <i className="fas fa-edit"></i>
                          </span>
                        </Link>
                        <div
                          onClick={() => handleDelete(product.id)}
                          className="badge rounded-pill bg-danger p-3"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fas fa-trash"></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3 className="text-light">Товаров нет</h3>
      )}
      <Link to="/add-product" className="btn-add">
        <i className="fas fa-plus text-light"></i>
      </Link>
    </div>
  );
};

export default Account;
