const profileEditPopup = document.querySelector('.popup');
const profileNameField = document.querySelector('.profile__name');
const profileSubtitleField = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_name');
const profileSubtitleInput = document.querySelector('.form__input_subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileButtonClose = profileEditPopup.querySelector('.popup__button-close');
const profileEditForm = profileEditPopup.querySelector('.form');

const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input_name');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');

const cardAddPopup = document.querySelector('.popup-add');
const cardTitleInput = document.querySelector('.form__input_title');
const cardLinkInput = document.querySelector('.form__input_link');
const cardAddButton = document.querySelector('.profile__add-button');
const cardButtonClose = cardAddPopup.querySelector('.popup__button-close');
const cardAddForm = cardAddPopup.querySelector('.form');

const cardPopup = document.querySelector('.popup-image');
const cardPopupImage = cardPopup.querySelector('.popup-image__img');
const cardPopupDescription = cardPopup.querySelector('.popup-image__img-description');
const cardPopupCloseButton = cardPopup.querySelector('.popup__button-close');

function validateProfileInput(inputElement, errorElement) {
  console.log(errorElement.textContent);
  if (inputElement.validity.valid) {
    errorElement.textContent = "";
  }    
  else if (inputElement.validity.patternMismatch) {
    errorElement.textContent = "Поле может содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы";
  }
  else {
    errorElement.textContent = inputElement.validationMessage;
  }
}

function enableFormValidation(formElement, inputValidationCallback) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener('input', () => inputValidationCallback(inputElement, errorElement));
  });
}

enableFormValidation(profileEditForm, validateProfileInput);


const defaultCards = [
  {
    title: 'Эльбрус',
    link: 'images/elbrus.jpg'
  },
  {
    title: 'Белуха',
    link: 'images/beluha.jpg'
  },
  {
    title: 'Казбег',
    link: 'images/kazbeg.jpg'
  },
  {
    title: 'Ключевская сопка',
    link: 'images/kljuchevskaja-sopka.jpg'
  },
  {
    title: 'Коштан - Тау',
    link: 'images/koshtan-tau.jpg'
  },
  {
    title: 'Мунку-Сардык',
    link: 'images/munku-sardyk.jpg'
  }
];

function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function deleteCard(evt) {
  const cardItem = evt.target.closest('.cards__item');
  cardItem.remove();
}

function createCard(title, link) {
  const cardItem = cardTemplate.content.cloneNode(true);

  const cardsImage = cardItem.querySelector('.cards__image');
  cardsImage.src = link;
  cardsImage.alt = title;
  
  const cardsLocation = cardItem.querySelector('.cards__location');
  cardsLocation.textContent = title;

  const like = cardItem.querySelector('.cards__icon');
  like.addEventListener('click', cardLikeClick);

  const trash = cardItem.querySelector('.cards__trash-button');
  trash.addEventListener('click', deleteCard);

  const image = cardItem.querySelector('.cards__image');
  image.addEventListener('click', openPopupImg);
  
  return cardItem;
};

function renderCard(container, card) {  
  container.insertBefore(card, container.firstChild);
};

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

function submitAddCard(evt) {
  evt.preventDefault();

  const card = createCard(cardTitleInput.value, cardLinkInput.value);
  renderCard(cardsContainer, card);

  cardTitleInput.value = '';
  cardLinkInput.value = '';

  closePopup(cardAddPopup);
};

function cardLikeClick(evt) {
  evt.target.classList.toggle('cards__icon_active');
};

function openPopupImg(evt) {
  const card = evt.target.closest('.cards__item');
  const location = card.querySelector('.cards__location');
  cardPopupDescription.textContent = location.textContent;

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = location.textContent;

  openPopup(cardPopup);
}


defaultCards.forEach(card => {
  const cardItem = createCard(card.title, card.link);
  renderCard(cardsContainer, cardItem);
});

profileEditButton.addEventListener('click', openProfileEditPopup);
profileButtonClose.addEventListener('click', () => closePopup(profileEditPopup));
profileEditForm.addEventListener('submit', submitProfileEdit);

cardAddButton.addEventListener('click', () => openPopup(cardAddPopup));
cardButtonClose.addEventListener('click', () => closePopup(cardAddPopup));
cardAddForm.addEventListener('submit', submitAddCard);

cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
