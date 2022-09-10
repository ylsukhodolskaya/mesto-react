import avatar from '../images/Photo-content/Avatar.jpg';
// import { useState, useEffect } from 'react';
import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';





function Main(props) {

  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

  // const [userName, setUserName] = React.useState("Юлия");
  // const [userDescription, setUserDescription] = React.useState("Привет");
  // const [userAvatar, setUserAvatar] = React.useState(avatar);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Юлия', about: 'Fox', avatar: avatar });

  const [cards, setCards] = React.useState([]);

  const cardComponents = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onClick={onCardClick}
    />
  ));


  React.useEffect(() => {
    // Загрузка готовых карточек и данных о пользователе с сервера
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, userData]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log('//////Ошибка Promise.all//////', err);
      });
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Аватарка"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-edit-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Карточки">
        <ul className="elements-list">{cardComponents}</ul>
      </section>

    </main>
  )
}

export default Main;