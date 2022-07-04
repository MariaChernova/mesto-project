// Popup. User data changes
const popup = document.querySelector('.popup');
const nameField = document.querySelector('.profile__name');
const subtitleField = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.form__input_name');
let subtitleInput = document.querySelector('.form__input_subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameField.textContent;
  subtitleInput.value = subtitleField.textContent;
};

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);


function closePopup() {
  popup.classList.remove('popup_opened')
};

const buttonClose = popup.querySelector('.popup__button-close');
buttonClose.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameField.textContent = `${nameInput.value}`;
  subtitleField.textContent = `${subtitleInput.value}`;
  closePopup();
};

const form = popup.querySelector('.form');
form.addEventListener('submit', formSubmitHandler);


// Popup. Adding a card
const popupAdd = document.querySelector('.popup-add');

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
};

const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', openPopupAdd);

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened')
};

const buttonCloseAdd = popupAdd.querySelector('.popup__button-close');
buttonCloseAdd.addEventListener('click', closePopupAdd);

function addCard(title, link) {
  let cardItem = document.createElement('div');
  cardItem.innerHTML = `
    <button class="cards__trash-button" type="button" aria-label="Удалить"></button>
    <img class="cards__image" src="${link}" alt="">
    <div class="cards__info">
      <h2 class="cards__location">${title}</h2>
      <button class="cards__icon" type="button" aria-label="Like it"></button>
    </div>`;
  cardItem.classList.add('cards__item');
  
  let cards = document.querySelector('.cards');
  cards.insertBefore(cardItem, cards.childNodes[0]);

  let like = cardItem.querySelector('.cards__icon');
  like.addEventListener('click', likeClickHandler);

  let trash = cardItem.querySelector('.cards__trash-button');
  trash.addEventListener('click', deleteCardHandler);

  let image = cardItem.querySelector('.cards__image');
  image.addEventListener('click', openPopupImg);
};

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  let titleInput = document.querySelector('.form__input_title');
  let linkInput = document.querySelector('.form__input_link');
  addCard(titleInput.value, linkInput.value);
  closePopupAdd();
};

const formAdd = popupAdd.querySelector('.form');
formAdd.addEventListener('submit', addCardSubmitHandler);

// Deleting a card

const buttonsDeleteCard = document.querySelectorAll('.cards__trash-button');

buttonsDeleteCard.forEach(button => {
  button.addEventListener('click', deleteCardHandler);
});

function deleteCardHandler(evt) {
  const cardItem = evt.currentTarget.closest('.cards__item');
  cardItem.remove();
}

// Likes

const likes = document.querySelectorAll('.cards__icon');

function likeClickHandler(evt) {
  if (evt.currentTarget.classList.contains('cards__icon_active')) {
    evt.currentTarget.classList.remove('cards__icon_active');
  } else {
    evt.currentTarget.classList.add('cards__icon_active'); 
  }
};

likes.forEach(button => {
  button.addEventListener('click', likeClickHandler);
});


// Popup. Image
const popupImg = document.querySelector('.popup-image');

function closePopupImg() {
  popupImg.classList.remove('popup_opened')
};

const buttonCloseImg = popupImg.querySelector('.popup__button-close');
buttonCloseImg.addEventListener('click', closePopupImg);

const images = document.querySelectorAll('.cards__image');

images.forEach(button => {
  button.addEventListener('click', openPopupImg);
});

function openPopupImg(evt) {
  let popup = document.querySelector('.popup-image');
  let image = popup.querySelector('.popup-image__img');
  image.src = evt.currentTarget.src;

  let description = popup.querySelector('.popup-image__img-description');
  const card = evt.currentTarget.closest('.cards__item');
  const location = card.querySelector('.cards__location');
  description.textContent = location.textContent;

  popup.classList.add('popup_opened');
}
