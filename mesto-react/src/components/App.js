// import logo from '../logo.svg';
import React from 'react';
// import { useState } from 'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  };

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        textsubmit="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label className="popup__label">
              <input
                type="text"
                className="popup__input popup__input_type_name"
                name="name"
                id="input-name"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required=""
              />
              <span className="input-name-error" />
            </label>
            <label className="popup__label">
              <input
                type="text"
                className="popup__input popup__input_type_description"
                name="about"
                id="input-about"
                placeholder="О себе"
                minLength={2}
                maxLength={200}
              />
              <span className="input-about-error" />
            </label>
          </>
        }
      />

      <PopupWithForm
        name="place"
        title="Новое место"
        textsubmit="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label className="popup__label">
              <input
                type="text"
                className="popup__input popup__input_type_title"
                name="name"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                id="input-place-name"
                required=""
              />
              <span className="input-place-name-error" />
            </label>
            <label className="popup__label">
              <input
                type="url"
                className="popup__input popup__input_type_link"
                name="link"
                id="input-link"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="input-link-error" />
            </label>
          </>
        }
      />


      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        textsubmit="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label className="popup__label">
              <input
                type="url"
                className="popup__input popup__input_type_link"
                name="avatar"
                id="input-avatar"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="input-avatar-error" />
            </label>
          </>
        }
      />


      <div className="popup popup-delete-card">
        <div className="popup__container">
          <button className="button popup__close-button" />
          <form
            className="popup__form popup__form-delete"
            id="delete-form"
            name="delete"
            noValidate=""
          >
            <h2 className="popup__title">Вы уверены?</h2>
            <button
              className="button popup__save-button popup__save-button-delete"
              type="submit"
            >
              Да
            </button>
          </form>
        </div>
      </div>


      
      <template id="template-element" />
    </>

  );
}

export default App;
