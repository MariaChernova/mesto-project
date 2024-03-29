import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validateForm, validateFormButton } from './components/validate.js';
import { fetchCards, sendAvatar, fetchProfileInfo, sendCard, sendProfile } from './components/api.js';

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form');
const profileImage = document.querySelector('.profile__image');
const editProfileSubmitButton = profileEditPopup.querySelector('.form__button');
const editProfileSubmitButtonText = editProfileSubmitButton.textContent;

const avatarEditPopup = document.querySelector('.popup-avatar');
const avatarEditButton = document.querySelector('.profile__image-edit');
const avatarEditInput = document.querySelector('.form__input_avatar-url');
const avatarEditForm = avatarEditPopup.querySelector('.form');
const editAvatarSubmitButton = avatarEditPopup.querySelector('.form__button');
const editAvatarSubmitButtonText = editAvatarSubmitButton.textContent;

const cardsContainer = document.querySelector('.cards');
const cardAddPopup = document.querySelector('.popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form');
const cardTitleInput = document.querySelector('.form__input_title');
const cardLinkInput = document.querySelector('.form__input_link');
const addCardSubmitButton = cardAddPopup.querySelector('.form__button');
const addCardSubmitButtonText = addCardSubmitButton.textContent;

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
  Promise.all([fetchProfileInfo(), fetchCards()])
  .then(([profile, cards]) => {
    renderProfile(profile.name, profile.about, profile.avatar);
    addCards(cards.reverse(), profile._id);
  })
  .catch(err => {
    console.log(err);
  });
}

fetchPageData();

function renderCard(container, card, cardId) {  
  container.insertBefore(card, container.firstChild);
  // data-* attributes can not be set to DOM-elements without parent it seems.
  container.firstElementChild.dataset.cardId = cardId;
};

function renderLoading(button) {
  button.textContent = "Сохранение...";
};

function addCards(cards, myId) {
  cards.forEach(card => {
    const liked = card.likes.some((like) => {
      return like._id === myId;
    });
    const cardItem = createCard(card.name, card.link, card.likes.length, card.owner._id === myId, liked);
    renderCard(cardsContainer, cardItem, card._id);
  });
};

function openAddCardPopup() {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  validateFormButton(validationConfig, cardAddPopup);
  openPopup(cardAddPopup);
};

function submitAddCard(evt) {
  evt.preventDefault();

  sendCard(cardTitleInput.value, cardLinkInput.value)
  .then((res) => {
    const card = createCard(res.name, res.link, res.likes.length, true, false);
    renderCard(cardsContainer, card, res._id);
    closePopup(cardAddPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addCardSubmitButton.textContent = addCardSubmitButtonText;
  });

  renderLoading(addCardSubmitButton);
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
  sendProfile(profileNameInput.value, profileSubtitleInput.value)
  .then((res) => {
    renderProfile(res.name, res.about, res.avatar);
    closePopup(profileEditPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfileSubmitButton.textContent = editProfileSubmitButtonText;
  });
  
  renderLoading(editProfileSubmitButton);
};

function openAvatarEditPopup() {
  avatarEditInput.value = '';
  validateFormButton(validationConfig, avatarEditPopup);
  openPopup(avatarEditPopup);
};

function submitAvatarEdit(evt) {
  evt.preventDefault();
  sendAvatar(avatarEditInput.value)
  .then((res) => {
    renderProfile(res.name, res.about, res.avatar);
    closePopup(avatarEditPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editAvatarSubmitButton.textContent = editAvatarSubmitButtonText;
  });
  renderLoading(editAvatarSubmitButton);
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
