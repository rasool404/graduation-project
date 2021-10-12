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
          />
          <h1 className="mb-3 fw-bold text-light">Зарегистрироваться</h1>

          <div className="form-floating ">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email адрес</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              style={{ borderRadius: "0" }}
            />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="password"
              className="form-control"
              id="floatingPassword2"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword2">Подтвердить пароль</label>
          </div>
          <Link to="/" className="w-100 btn btn-lg btn-primary" type="submit">
            Зарегистрироваться
          </Link>
          <p className="text-light my-2">
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
