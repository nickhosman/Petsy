import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }

  };

  const handledemoUserLogin = (e) => {
    e.preventDefault()
    setErrors([]);
    return dispatch(login('demouser@appacademy.io', 'password'))
      .then(closeModal)

  }


  return (
    <div id="login-modal-div">
      <h1>Log In</h1>
      <form id="login-modal-form" onSubmit={handleSubmit}>
        <ul>
          {/* {errors&&errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}

        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* {errors && errors.email &&
          <p className="login-input-error">
            {errors.email}
          </p>} */}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && errors.password &&
          <p className="login-input-error">
            {errors.password}
          </p>}
        <button id="demo-submit-btn" onClick={handledemoUserLogin}>Demo User</button>
        <button id="login-form-submit-btn" type="submit"  >Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
