import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Login = () => {
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
            Войти
          </h1>

          <div
            className="form-floating mb-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div
            className="form-floating mb-5"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <Link
            to="/"
            className="w-100 btn btn-lg btn-primary mb-2"
            type="submit"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Войти
          </Link>
          <Link
            to="/registration"
            className="text-light link d-block"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            Зарегистрироваться
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
