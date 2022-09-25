import { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
// Импортируем объект контекста
import { CurrentUserContext, defaultUserInfo } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewCardPopupOpen, setIsPreviewCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  // Переменная состояния пользователя
  const [currentUser, setCurrentUser] = useState(defaultUserInfo);
  const [cards, setCards] = useState([]);

  //переменная состояния currentUser и эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения
  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log('//////Ошибка api.getUserInfo//////', err)
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log('//////Ошибка api.getInitialCards//////', err);
      });
  }, [])

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

  // Функция постановки лайков карточке
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((serverCards) => serverCards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  // Функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((serverCards) => serverCards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Изменение данных профиля
  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser(userDataServer)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => closeAllPopups());
  };

  // Изменение аватара профиля
  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then((userAvatarServer) => {
        setCurrentUser(userAvatarServer)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => closeAllPopups());
  };

  // Добавление новой карточки
  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPreviewCardPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
