import React from 'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';




function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPreviewCardPopupOpen, setIsPreviewCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsPreviewCardPopupOpen(true);
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewCardPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
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

      <ImagePopup
        card={selectedCard}
        isOpen={isPreviewCardPopupOpen}
        onClose={closeAllPopups}
      />

    </>

  );
}

export default App;
