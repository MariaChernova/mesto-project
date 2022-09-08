import './pages/index.css';

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileButtonClose = profileEditPopup.querySelector('.popup__button-close');
const profileEditForm = profileEditPopup.querySelector('.form');

const cardAddPopup = document.querySelector('.popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardButtonClose = cardAddPopup.querySelector('.popup__button-close');
const cardAddForm = cardAddPopup.querySelector('.form');

const cardPopup = document.querySelector('.popup-image');
const cardPopupCloseButton = cardPopup.querySelector('.popup__button-close');



addDefaultCards();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button-inactive',
});

window.onkeydown = (evt) => {
  if (evt.keyCode == 27) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popups.forEach(popup => {
  const overlay = popup.querySelector('.overlay');
  overlay.addEventListener('click', () => {
    closePopup(popup);
  });
});

profileEditButton.addEventListener('click', openProfileEditPopup);
profileButtonClose.addEventListener('click', () => closePopup(profileEditPopup));
profileEditForm.addEventListener('submit', submitProfileEdit);

cardAddButton.addEventListener('click', () => openPopup(cardAddPopup));
cardButtonClose.addEventListener('click', () => closePopup(cardAddPopup));
cardAddForm.addEventListener('submit', submitAddCard);

cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
