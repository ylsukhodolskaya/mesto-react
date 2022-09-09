import avatar from '../images/Photo-content/Avatar.jpg';
import { useState, useEffect } from 'react';
import React from 'react';




function Main(props) {

  const { onEditProfile, onAddPlace, onEditAvatar } = props;

  const [userName, setUserName] = useState("Юлия");
  const [userDescription, setUserDescription] = useState("Привет");

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            src={avatar}
            alt="Аватарка"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-edit-button">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Карточки">
        <ul className="elements-list"></ul>
      </section>

    </main>
  )
}

export default Main;