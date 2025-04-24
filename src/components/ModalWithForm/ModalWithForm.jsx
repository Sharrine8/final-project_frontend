import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, title, closeActiveModal }) {
  return (
    <div className={`modal ${isOpen === isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={closeActiveModal}
        />
        <form className="modal__form">
          {/* {React.Children.map(children, (child) =>
            React.cloneElement(child, { onChange: handleChange })
          )} */}
          {children}
          <div className="modal__form-btns">
            <button type="button" className="modal__submit">
              Sign Up
            </button>
            <button type="button" className="modal__switch-btn">
              Switch button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
