import React from 'react';

function Card(props) {
  const { card, onClick } = props;

  return (
    <li className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={() => onClick(card)} />
      <button className="button element__delete-button" type="button" />
      <div className="element__name">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className="button element__like-button" type="button" />
          <h3 className="element__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  )
}

export default Card;