import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function LoginModal({
  closeActiveModal,
  isOpen,
  switchLoginModal,
  handleLoginSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    console.log(email);
    handleLoginSubmit({ email, password });
  };
  return (
    <ModalWithForm
      title="Sign in"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      switchModal={switchLoginModal}
      switchText={"or Sign up"}
      buttonText={"Sign in"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="login-email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          id="login-password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
