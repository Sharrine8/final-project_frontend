import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ closeActiveModal, isOpen }) {
  return (
    <ModalWithForm
      title="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
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
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
