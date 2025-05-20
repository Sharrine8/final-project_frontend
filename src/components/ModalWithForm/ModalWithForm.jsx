import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  closeActiveModal,
  isOpen,
  switchModal,
  switchText,
  buttonText,
  onSubmit,
  isSubmitDisabled,
}) {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeActiveModal]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal")) {
      closeActiveModal();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleClickOutside}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={closeActiveModal}
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__form-btns">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__switch-btn"
              onClick={switchModal}
            >
              {switchText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
