
import React from 'react';
// import cn from 'classnames';

const PopupWithForm = (props) => {
  const { name, title, children, textsubmit, isOpen, onClose } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="button popup__close-button" onClick={onClose}></button>
        <form className={`popup__form popup__form_${name}`} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="button popup__save-button" >{textsubmit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm


