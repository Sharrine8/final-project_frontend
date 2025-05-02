import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({
  closeActiveModal,
  isOpen,
  switchRegisterModal,
  onRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }
    onRegister({ email, password, name });
  };
  return (
    <ModalWithForm
      title="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      switchModal={switchRegisterModal}
      switchText={"or Sign in"}
      buttonText={"Sign up"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email"
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
          id="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Username{" "}
        <input
          type="text"
          className="modal__input"
          name="username"
          id="username"
          placeholder="Enter username"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
