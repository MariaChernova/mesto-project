import { openPopup } from './modal.js';
import { sendCardDelete, sendLike } from './api.js';


const cardTemplate = document.getElementById('card-template');
const cardPopup = document.querySelector('.popup-image');
const cardPopupImage = cardPopup.querySelector('.popup-image__img');
const cardPopupDescription = cardPopup.querySelector('.popup-image__img-description');

function deleteCardHandler(evt) {
  const cardItem = evt.target.closest('.cards__item');
  sendCardDelete(cardItem.dataset.cardId)
  .then ((_) => {
    cardItem.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

function openImage(title, link) {
  cardPopupImage.src = link;
  cardPopupImage.alt = title;
  cardPopupDescription.textContent = title;

  openPopup(cardPopup);
}

function createCard(title, link, likesNum, owned, liked) {
  const cardItem = cardTemplate.content.cloneNode(true);

  const cardsImage = cardItem.querySelector('.cards__image');
  cardsImage.src = link;
  cardsImage.alt = title;
  
  const cardsLocation = cardItem.querySelector('.cards__location');
  cardsLocation.textContent = title;

  const like = cardItem.querySelector('.cards__icon');
  if (liked) {
    like.classList.add('cards__icon_active');
  }
  like.addEventListener('click', cardLikeHandler);
  
  const trash = cardItem.querySelector('.cards__trash-button');
  if (owned) {
    trash.addEventListener('click', deleteCardHandler);
  } else {
    trash.remove();
  }

  cardsImage.addEventListener('click', () => openImage(title, link));

  const cardLikeCounter = cardItem.querySelector('.cards__like-counter');
  cardLikeCounter.textContent = likesNum.toString();
  
  return cardItem;
};

function cardLikeHandler(evt) {
  const cardItem = evt.target.closest('.cards__item');
  const cardLikeCounter = cardItem.querySelector('.cards__like-counter');

  sendLike(cardItem.dataset.cardId, !evt.target.classList.contains('cards__icon_active'))
  .then ((res) => {
    cardLikeCounter.textContent = res.likes.length.toString();
    evt.target.classList.toggle('cards__icon_active');
  })
  .catch((err) => {
    console.log(err);
  });
};

export { createCard };
