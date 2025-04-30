import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ closeActiveModal, isOpen, switchLoginModal }) {
  return (
    <ModalWithForm
      title="Sign in"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      switchModal={switchLoginModal}
      switchText={"or Sign up"}
      buttonText={"Sign in"}
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
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
