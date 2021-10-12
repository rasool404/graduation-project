import React, { useState } from "react";
import { categories } from "../store";
import { useDispatch, useSelector } from "react-redux";

const Add_product_page = () => {
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
      let isUniqueCategory = categories.some((el) => {
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
      <h1 className="text-light text-center mb-5 border-bottom border-light pb-4">
        Добавить товар
      </h1>
      <div className="add-product-main">
        <div className="card p-4">
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="form-check">
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

          <div className="mb-3">
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

export default Add_product_page;
