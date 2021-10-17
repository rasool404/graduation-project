import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Title from "../components/Title";
import { categories } from "../store";
import PropTypes from "prop-types";

const Edit = ({ mode }) => {
  const { id } = useParams();
  const store = useSelector((store) => store);
  const [product] = useState(store.filter((item) => item.id === Number(id)));
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [ownCategory, setOwnCategory] = useState(false);
  const [showOldValues, setShowOldValues] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
    category: product[0].category,
    description: ""
  });

  function handleChangeInput(event) {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  }

  function handleEditProduct(name, price, img, category, description) {
    let newObj = store;
    newObj = newObj.map((item) => {
      if (item.id === Number(id)) {
        item.name = name.trim() ? name : item.name;
        item.price = Number(price) ? Number(price) : item.price;
        item.img = img.trim() ? img : item.img;
        item.category = category;
        item.description = description.trim() ? description : item.description;
        return item;
      } else {
        return item;
      }
    });
    dispatch({ type: "CHANGE_STATE", payload: newObj });
    setNewProduct({
      name: "",
      price: "",
      img: "",
      category: product[0].category,
      description: ""
    });

    const canPush = categories.some((el) => {
      return el === newProduct.category;
    });
    if (!canPush) {
      categories.push(newProduct.category);
    }

    setMessage("Товар успешно изменен");
    setTimeout(() => {
      setMessage("");
    }, 1000);
  }

  function handleCheckbox() {
    setOwnCategory((prev) => !prev);
  }

  function handleShowOldValues() {
    setShowOldValues((prev) => !prev);
  }

  return (
    <div className="container edit-page">
      {product.length ? (
        <>
          <Title mode={mode}>Редактировать товар</Title>
          <div className="d-flex">
            <div className="me-5" data-aos="zoom-in">
              <img
                style={{ width: "500px" }}
                src={newProduct.img.trim() ? newProduct.img : product[0].img}
                alt=""
              />
            </div>
            <div
              className="card p-4"
              style={
                mode
                  ? {
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                      flex: "1 1 auto"
                    }
                  : { flex: "1 1 auto" }
              }
            >
              <div className="mb-3" data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="name" className="form-label">
                  Название
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={showOldValues ? product[0].name : ""}
                  value={newProduct.name}
                  name="name"
                  onChange={(event) => handleChangeInput(event)}
                />
              </div>
              <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="price" className="form-label">
                  Цена
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder={showOldValues ? product[0].price + "₽" : ""}
                  value={newProduct.price}
                  name="price"
                  onChange={(event) => handleChangeInput(event)}
                />
              </div>
              <div className="mb-3" data-aos="fade-up" data-aos-delay="600">
                <label htmlFor="img" className="form-label">
                  Фото
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="img"
                  placeholder={showOldValues ? product[0].img : ""}
                  value={newProduct.img}
                  name="img"
                  onChange={(event) => handleChangeInput(event)}
                />
              </div>
              {ownCategory ? (
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Новая категория
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder={"Новая категория"}
                    value={newProduct.category}
                    name="category"
                    onChange={(event) => handleChangeInput(event)}
                  />
                </div>
              ) : (
                <div className="mb-3" data-aos="fade-up" data-aos-delay="800">
                  <label htmlFor="category" className="form-label">
                    Категория
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    onChange={(event) => handleChangeInput(event)}
                    name="category"
                    value={newProduct.category}
                  >
                    {categories.map((category, idx) => (
                      <option value={category} key={idx}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div
                className="form-check"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newCategory"
                  onChange={() => handleCheckbox()}
                />
                <label className="form-check-label" htmlFor="newCategory">
                  Изменить на новую категорию
                </label>
              </div>
              <div className="mb-3" data-aos="fade-up" data-aos-delay="1200">
                <label htmlFor="description" className="form-label">
                  Описание
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder={showOldValues ? product[0].description : ""}
                  value={newProduct.description}
                  onChange={(event) => handleChangeInput(event)}
                ></textarea>
              </div>
              {message && <div className="confirm text-success">{message}</div>}
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                data-aos="fade-up"
                data-aos-delay="1400"
                onClick={() =>
                  handleEditProduct(
                    newProduct.name,
                    newProduct.price,
                    newProduct.img,
                    newProduct.category,
                    newProduct.description
                  )
                }
              >
                Редактировать
              </button>

              <div
                className="form-check mt-2"
                data-aos="fade-up"
                data-aos-delay="1600"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showOldCats"
                  checked={showOldValues ? "checked" : ""}
                  onChange={() => handleShowOldValues()}
                />
                <label className="form-check-label" htmlFor="showOldCats">
                  Показать старые значения
                </label>
              </div>
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
Edit.propTypes = {
  mode: PropTypes.bool
};
export default Edit;
