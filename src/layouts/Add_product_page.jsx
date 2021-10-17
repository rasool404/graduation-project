import React, { useState } from "react";
import { categories } from "../store";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Title from "../components/Title";

const Add = ({ mode }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [products] = useState(
    state.sort((a, b) => Number(a.id) - Number(b.id))
  );

  const [ownCategory, setOwnCategory] = useState(false);

  const [message, setMessage] = useState("");

  const [createProduct, setCreateProduct] = useState({
    name: "",
    price: "",
    img: "",
    category: "",
    description: ""
  });

  function handleChangeInput(event) {
    setMessage("");
    setCreateProduct({
      ...createProduct,
      [event.target.name]: event.target.value
    });
  }

  function handleCheckbox() {
    setOwnCategory((prev) => !prev);
  }

  function handleAddNewProduct(name, price, img, category, description) {
    setMessage("");
    if (
      name.trim() &&
      Number(price) &&
      img.trim() &&
      description.trim() &&
      category
    ) {
      const newProduct = {
        id: products.length + 1,
        name: name.trim(),
        price: Number(price),
        img: img.trim(),
        description,
        category,
        count: 1,
        activeBasket: false,
        activeFavorite: false
      };
      const newProducts = products;
      newProducts.push(newProduct);
      dispatch({ type: "CHANGE_STATE", payload: newProducts });
      setCreateProduct({
        ...createProduct,
        name: "",
        price: "",
        img: "",
        description: ""
      });
      const isUniqueCategory = categories.some((el) => {
        return el === createProduct.category;
      });
      if (!isUniqueCategory) {
        categories.push(createProduct.category);
      }
      setMessage("Товар успешно создан");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    } else {
      setMessage("Заполните все поля правильно");
    }
  }

  return (
    <div className="container add-product">
      <Title mode={mode}>Добавить товар</Title>
      <div className="add-product-main">
        <div
          className="card add-card p-4"
          style={
            mode
              ? {
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
                }
              : {}
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
              name="name"
              value={createProduct.name}
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
              name="price"
              value={createProduct.price}
              onChange={(event) => handleChangeInput(event)}
            />
          </div>
          <div className="mb-3" data-aos="fade-up" data-aos-delay="600">
            <label htmlFor="photo" className="form-label">
              Фото (Url)
            </label>
            <input
              type="text"
              className="form-control"
              id="photo"
              name="img"
              value={createProduct.img}
              onChange={(event) => handleChangeInput(event)}
            />
          </div>
          <div className="mb-3" data-aos="fade-up" data-aos-delay="800">
            <label htmlFor="category" className="form-label">
              {ownCategory ? "Новая категория" : "Категория"}
            </label>
            {!ownCategory ? (
              <select
                className="form-select"
                id="category"
                name="category"
                value={createProduct.category}
                onChange={(event) => handleChangeInput(event)}
              >
                <option value="">Выберите категорию</option>
                {categories.map((category, idx) => (
                  <option value={category} key={idx}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form-control"
                name="category"
                value={createProduct.category}
                onChange={(event) => handleChangeInput(event)}
              />
            )}
          </div>
          <div className="form-check" data-aos="fade-up" data-aos-delay="1000">
            <input
              className="form-check-input"
              type="checkbox"
              id="newCategory"
              onChange={() => handleCheckbox()}
            />
            <label className="form-check-label" htmlFor="newCategory">
              Добавить новую категорию
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
              value={createProduct.description}
              onChange={(event) => handleChangeInput(event)}
            ></textarea>
          </div>
          {message && (
            <div className="mb-2" style={{ fontWeight: "500" }}>
              {message}
            </div>
          )}
          <button
            type="button"
            className="btn btn-success"
            style={{ width: "100%" }}
            data-aos="fade-up"
            data-aos-delay="1400"
            onClick={() =>
              handleAddNewProduct(
                createProduct.name,
                createProduct.price,
                createProduct.img,
                createProduct.category,
                createProduct.description
              )
            }
          >
            Добавить
          </button>
        </div>

        {createProduct.img && (
          <div className="add-product-img-preview">
            <img src={createProduct.img} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

Add.propTypes = {
  mode: PropTypes.bool
};

export default Add;
