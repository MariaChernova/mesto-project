import './pages/index.css';
import { addDefaultCards, submitAddCard } from './components/card.js';
import { openPopup, closePopup, openProfileEditPopup, submitProfileEdit, closeOpenedPopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';

export {profileEditPopup, cardAddPopup};

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form');

const cardAddPopup = document.querySelector('.popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form');

addDefaultCards();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button-inactive',
});

window.onkeydown = (evt) => {
  if (evt.keyCode == 27) {
    closeOpenedPopup();
  }
};

popups.forEach(popup => {
  const overlay = popup.querySelector('.overlay');
  overlay.addEventListener('click', () => {
    closePopup(popup);
  });
  const closeButton = popup.querySelector('.popup__button-close');
  closeButton.addEventListener('click', () => {
    closePopup(popup);
  });
});

profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditForm.addEventListener('submit', submitProfileEdit);

cardAddButton.addEventListener('click', () => openPopup(cardAddPopup));
cardAddForm.addEventListener('submit', submitAddCard);



