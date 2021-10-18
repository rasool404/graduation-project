import React from "react";
import { useInput } from "../utils";

// import { Link } from "react-router-dom";
// import logo from "../assets/logo.svg";

const Registration = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6 });
  return (
    <div className="login container">
      <form>
        <h1>Registration</h1>
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          type="email"
          placeholder="Email"
          className={email.isDirty && email.isEmpty && "error"}
        />
        {email.isDirty && email.isEmpty && (
          <p className="error-text">Поле не может быть пустым</p>
        )}
        {email.isDirty && email.isEmail && (
          <p className="error-text">Введите корректный email</p>
        )}

        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          type="password"
          placeholder="Password"
          className={
            password.isDirty &&
            password.isEmpty &&
            password.minLengthError &&
            "error"
          }
        />
        {password.isDirty && password.isEmpty && (
          <p className="error-text">Поле не может быть пустым</p>
        )}
        {password.isDirty && password.minLengthError && (
          <p className="error-text">Некорректная длина (6)</p>
        )}
        <button
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Registration;
