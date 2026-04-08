import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { authorize } from "../../utils/auth";

function LoginModal({ isOpen, closeActiveModal, switchLoginModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setCurrentUser({ name: res.user.name, email: res.user.email });
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => setError("Login failed: " + err));
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      switchModal={switchLoginModal}
      switchText="Register"
      buttonText="Log In"
      onSubmit={handleSubmit}
      isSubmitDisabled={!email || !password}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;

// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import React, { useState } from "react";

// function LoginModal({
//   closeActiveModal,
//   isOpen,
//   switchLoginModal,
//   handleLoginSubmit,
// }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const isFormValid = email && password;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please fill in both fields");
//       return;
//     }
//     handleLoginSubmit({ email, password });
//   };
//   return (
//     <ModalWithForm
//       title="Sign in"
//       closeActiveModal={closeActiveModal}
//       isOpen={isOpen}
//       switchModal={switchLoginModal}
//       switchText={"or Sign up"}
//       buttonText={"Sign in"}
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!isFormValid}
//     >
//       <label htmlFor="email" className="modal__label">
//         Email{" "}
//         <input
//           type="email"
//           className="modal__input"
//           name="email"
//           id="login-email"
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
//           id="login-password"
//           placeholder="Enter password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       {error && <p className="modal__error">{error}</p>}
//     </ModalWithForm>
//   );
// }

// export default LoginModal;
