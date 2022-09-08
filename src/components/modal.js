import { profileEditPopup } from '../index.js';

export { openPopup, closePopup, openProfileEditPopup, submitProfileEdit, closeOpenedPopup, openPopupImg }

const profileNameField = document.querySelector('.profile__name');
const profileSubtitleField = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_name');
const profileSubtitleInput = document.querySelector('.form__input_subtitle');

const cardPopup = document.querySelector('.popup-image');
const cardPopupImage = cardPopup.querySelector('.popup-image__img');
const cardPopupDescription = cardPopup.querySelector('.popup-image__img-description');

function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function openProfileEditPopup() {
  openPopup(profileEditPopup);
  profileNameInput.value = profileNameField.textContent;
  profileSubtitleInput.value = profileSubtitleField.textContent;
};

function submitProfileEdit(evt) {
  evt.preventDefault();
  profileNameField.textContent = profileNameInput.value;
  profileSubtitleField.textContent = profileSubtitleInput.value;
  closePopup(profileEditPopup);
};

function openPopupImg(evt) {
  const card = evt.target.closest('.cards__item');
  const location = card.querySelector('.cards__location');
  cardPopupDescription.textContent = location.textContent;

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = location.textContent;

  openPopup(cardPopup);
}

function closeOpenedPopup() {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}
