import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validateForm, validateFormButton } from './components/validate.js';

const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form');

const cardsContainer = document.querySelector('.cards');
const cardAddPopup = document.querySelector('.popup-add');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form');
const cardTitleInput = document.querySelector('.form__input_title');
const cardLinkInput = document.querySelector('.form__input_link');

const elbrusImage = new URL('./images/elbrus.jpg', import.meta.url);
const beluhaImage = new URL('./images/beluha.jpg', import.meta.url);
const kazbegImage = new URL('./images/kazbeg.jpg', import.meta.url);
const kljuchevskajaImage = new URL('./images/kljuchevskaja-sopka.jpg', import.meta.url);
const koshtanImage = new URL('./images/koshtan-tau.jpg', import.meta.url);
const munkuImage = new URL('./images/munku-sardyk.jpg', import.meta.url);

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

const defaultCards = [
  {
    title: 'Эльбрус',
    link: elbrusImage
  },
  {
    title: 'Белуха',
    link: beluhaImage
  },
  {
    title: 'Казбег',
    link: kazbegImage
  },
  {
    title: 'Ключевская сопка',
    link: kljuchevskajaImage
  },
  {
    title: 'Коштан - Тау',
    link: koshtanImage
  },
  {
    title: 'Мунку-Сардык',
    link: munkuImage
  }
];

function renderCard(container, card) {  
  container.insertBefore(card, container.firstChild);
};

function addCards(cards) {
  cards.forEach(card => {
    const cardItem = createCard(card.title, card.link);
    renderCard(cardsContainer, cardItem);
  });
}

function submitAddCard(evt) {
  evt.preventDefault();

  const card = createCard(cardTitleInput.value, cardLinkInput.value);
  renderCard(cardsContainer, card);

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

function submitProfileEdit(evt) {
  evt.preventDefault();
  profileNameField.textContent = profileNameInput.value;
  profileSubtitleField.textContent = profileSubtitleInput.value;
  closePopup(profileEditPopup);
};

function openAddCardPopup() {
  validateFormButton(validationConfig, cardAddPopup);
  openPopup(cardAddPopup);
};

addCards(defaultCards);

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
