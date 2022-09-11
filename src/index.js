import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validateForm, validateFormButton } from './components/validate.js';
import {fetchDataFromServer, putDataToServer} from './components/utils.js';

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form');
const profileImage = document.querySelector('.profile__image');

const avatarEditPopup = document.querySelector('.popup-avatar');
const avatarEditButton = document.querySelector('.profile__image-edit');
const avatarEditInput = document.querySelector('.form__input_avatar-url');
const avatarEditForm = avatarEditPopup.querySelector('.form');


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


function fetchPageData() {
  fetchDataFromServer('users/me')
  .then((profile) => {
    renderProfile(profile.name, profile.about, profile.avatar);
    // console.log(profile);
    fetchDataFromServer('cards')
    .then((res) => {
      // console.log(res);
      addCards(res.reverse(), profile._id);
    });
  });
};

fetchPageData();

function renderCard(container, card, cardId) {  
  container.insertBefore(card, container.firstChild);
  // data-* attributes can not be set to DOM-elements without parent it seems.
  container.firstElementChild.dataset.cardId = cardId;
};

function addCards(cards, myId) {
  cards.forEach(card => {
    const cardItem = createCard(card.name, card.link, card.likes.length, card.owner._id === myId);
    renderCard(cardsContainer, cardItem, card._id);
  });
};

function submitAddCard(evt) {
  evt.preventDefault();

  putDataToServer('cards', 'POST', {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  })
  .then((res) => {
    const card = createCard(res.name, res.link, res.likes.length, true);
    renderCard(cardsContainer, card, res._id);
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
  putDataToServer('users/me', 'PATCH', {
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

function openAvatarEditPopup() {
  avatarEditInput.value = '';
  openPopup(avatarEditPopup);
};

function submitAvatarEdit(evt) {
  evt.preventDefault();
  putDataToServer('users/me/avatar', 'PATCH', {
    avatar: avatarEditInput.value
  })
  .then((res) => {
    renderProfile(res.name, res.about, res.avatar);
  });
  closePopup(avatarEditPopup);
}


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

avatarEditButton.addEventListener('click', () => openAvatarEditPopup());
avatarEditForm.addEventListener('submit', submitAvatarEdit);
