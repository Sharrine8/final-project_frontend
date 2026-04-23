import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { createUser } from "../../utils/api";

function RegisterModal({ closeActiveModal, isOpen, switchRegisterModal }) {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isFormValid = email && password && name;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill in all fields");
      return;
    }

    createUser({ email, password, name })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setCurrentUser({ name: res.user.name, email: res.user.email });
        closeActiveModal();
      })
      .catch((err) => setError(err.message || "Email already in use"));
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setError("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      switchModal={switchRegisterModal}
      switchText="or Sign in"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <label className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          placeholder="Enter username"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
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

export default RegisterModal;

// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { useState } from "react";

// function RegisterModal({
//   closeActiveModal,
//   isOpen,
//   switchRegisterModal,
//   onRegister,
// }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");

//   const isFormValid = email && password && name;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password || !name) {
//       setError("Please fill in all fields");
//       return;
//     }
//     onRegister({ email, password, name });
//   };
//   return (
//     <ModalWithForm
//       title="Sign up"
//       closeActiveModal={closeActiveModal}
//       isOpen={isOpen}
//       switchModal={switchRegisterModal}
//       switchText={"or Sign in"}
//       buttonText={"Sign up"}
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isFormValid}
//     >
//       <label htmlFor="email" className="modal__label">
//         Email{" "}
//         <input
//           type="email"
//           className="modal__input"
//           name="email"
//           id="email"
//           placeholder="Enter email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label htmlFor="password" className="modal__label">
//         Password{" "}
//         <input
//           type="password"
//           className="modal__input"
//           name="password"
//           id="password"
//           placeholder="Enter password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label htmlFor="username" className="modal__label">
//         Username{" "}
//         <input
//           type="text"
//           className="modal__input"
//           name="username"
//           id="username"
//           placeholder="Enter username"
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//     </ModalWithForm>
//   );
// }

// export default RegisterModal;
