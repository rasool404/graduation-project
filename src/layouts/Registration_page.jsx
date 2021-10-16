import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Registration = () => {
  return (
    <div className="form-log-wrapper text-center">
      <div className="form-log">
        <form>
          <img
            className="mb-4"
            src={logo}
            alt="Logo"
            width="120"
            height="100"
            data-aos="zoom-in"
          />
          <h1
            className="mb-3 fw-bold text-light"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Зарегистрироваться
          </h1>

          <div
            className="form-floating"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email адрес</label>
          </div>
          <div
            className="form-floating"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              style={{ borderRadius: "0" }}
            />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>
          <div
            className="form-floating mb-5"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <input
              type="password"
              className="form-control"
              id="floatingPassword2"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword2">Подтвердить пароль</label>
          </div>
          <Link
            to="/"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            Зарегистрироваться
          </Link>
          <p
            className="text-light my-2"
            data-aos="fade-up"
            data-aos-delay="1400"
          >
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-light">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Registration;
