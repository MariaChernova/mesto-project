function fetchDataFromServer(server, cohort, target, token) {
  return fetch(`${server}/${cohort}/${target}`, {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
    return res.json()
  });
}

const token = '3a76beda-dcbb-4c59-817c-2a3fb7dba694';
const cohort = 'plus-cohort-14';
const server = 'https://nomoreparties.co/v1';

function putDataToServer(server, cohort, target, method, token, data) {
  return fetch(`${server}/${cohort}/${target}`, {
    method: method,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json()
  });
}

fetchDataFromServer(server, cohort, 'cards', token)
.then((res) => {
  console.log(res);
  addCards(res.reverse());
});

function fetchProfileData() {
  fetchDataFromServer(server, cohort, 'users/me', token)
  .then((res) => {
    renderProfile(res.name, res.about, res.avatar);
  });
};

fetchProfileData();

import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validateForm, validateFormButton } from './components/validate.js';

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form');
const profileImage = document.querySelector('.profile__image');

const cardsContainer = document.querySelector('.cards');
const cardAddPopup = document.querySelector('.popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form');
const cardTitleInput = document.querySelector('.form__input_title');
const cardLinkInput = document.querySelector('.form__input_link');

const profileNameField = document.querySelector('.profile__name');
const profileSubtitleField = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_name');
const profileSubtitleInput = document.querySelector('.form__input_subtitle');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button-inactive',
}

function renderCard(container, card) {  
  container.insertBefore(card, container.firstChild);
};

function addCards(cards) {
  cards.forEach(card => {
    const cardItem = createCard(card.name, card.link, card.likes.length);
    renderCard(cardsContainer, cardItem);
  });
};

function submitAddCard(evt) {
  evt.preventDefault();

  putDataToServer(server, cohort, 'cards', 'POST', token, {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  })
  .then((res) => {
    const card = createCard(res.name, res.link, res.likes.length);
    renderCard(cardsContainer, card);
  });

  cardTitleInput.value = '';
  cardLinkInput.value = '';

  closePopup(cardAddPopup);
};

function openProfileEditPopup() {
  profileNameInput.value = profileNameField.textContent;
  profileSubtitleInput.value = profileSubtitleField.textContent;
  validateForm(validationConfig, profileEditPopup);
  openPopup(profileEditPopup);
};

function renderProfile(name, about, avatarUrl) {
  profileNameField.textContent = name;
  profileSubtitleField.textContent = about;
  profileImage.src = avatarUrl;
  profileImage.alt = name;
};

function submitProfileEdit(evt) {
  evt.preventDefault();
  putDataToServer(server, cohort, 'users/me', 'PATCH', token, {
    name: profileNameInput.value,
    about: profileSubtitleInput.value
  })
  .then((res) => {
    renderProfile(res.name, res.about, res.avatar);
  });
  closePopup(profileEditPopup);
};

function openAddCardPopup() {
  validateFormButton(validationConfig, cardAddPopup);
  openPopup(cardAddPopup);
};

enableValidation(validationConfig);

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

cardAddButton.addEventListener('click', () => openAddCardPopup());
cardAddForm.addEventListener('submit', submitAddCard);
