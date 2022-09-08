import { openPopup } from './modal.js';

const cardTemplate = document.getElementById('card-template');
const cardPopup = document.querySelector('.popup-image');
const cardPopupImage = cardPopup.querySelector('.popup-image__img');
const cardPopupDescription = cardPopup.querySelector('.popup-image__img-description');

function deleteCardHandler(evt) {
  const cardItem = evt.target.closest('.cards__item');
  cardItem.remove();
}

function openImage(evt) {
  const card = evt.target.closest('.cards__item');
  const location = card.querySelector('.cards__location');
  cardPopupDescription.textContent = location.textContent;

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = location.textContent;

  openPopup(cardPopup);
}

function createCard(title, link) {
  const cardItem = cardTemplate.content.cloneNode(true);

  const cardsImage = cardItem.querySelector('.cards__image');
  cardsImage.src = link;
  cardsImage.alt = title;
  
  const cardsLocation = cardItem.querySelector('.cards__location');
  cardsLocation.textContent = title;

  const like = cardItem.querySelector('.cards__icon');
  like.addEventListener('click', cardLikeHandler);

  const trash = cardItem.querySelector('.cards__trash-button');
  trash.addEventListener('click', deleteCardHandler);

  const image = cardItem.querySelector('.cards__image');
  image.addEventListener('click', openImage);
  
  return cardItem;
};

function cardLikeHandler(evt) {
  evt.target.classList.toggle('cards__icon_active');
};

export { createCard };
