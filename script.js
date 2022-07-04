const editButton = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const form = popup.querySelector('.form');
const buttonClose = popup.querySelector('.popup__button-close');

const popupAdd = document.querySelector('.popup-add');
const buttonCloseAdd = popupAdd.querySelector('.popup__button-close');
const formAdd = popupAdd.querySelector('.form');

const nameField = document.querySelector('.profile__name');
const subtitleField = document.querySelector('.profile__subtitle');
const titleField = document.querySelector('.cards__location');
const linkField = document.querySelector('.cards__image');

let nameInput = document.querySelector('.form__input_name');
let subtitleInput = document.querySelector('.form__input_subtitle');

let cards = document.querySelector('.cards');


// Попап изменения данных пользователя

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameField.textContent;
  subtitleInput.value = subtitleField.textContent;
};

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened')
};

buttonClose.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameField.textContent = `${nameInput.value}`;
  subtitleField.textContent = `${subtitleInput.value}`;
  closePopup();
};

form.addEventListener('submit', formSubmitHandler);


// Попап добавления карточек

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
};

buttonAddCard.addEventListener('click', openPopupAdd);

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened')
};

buttonCloseAdd.addEventListener('click', closePopupAdd);


// Добавление карточки 

function addCard(title, link) {
  cards.insertAdjacentHTML('afterbegin', `
    <div class="cards__item">
      <button class="cards__trash-button" type="button" aria-label="Удалить"></button>
      <img class="cards__image" src="${link}" alt="">
      <div class="cards__info">
        <h2 class="cards__location">${title}</h2>
        <button class="cards__icon cards__icon_active" type="button" aria-label="Like it"></button>
      </div>
    </div>
  `);
};

function addCardSubmitHandler(evt) {
  evt.preventDefault();

  let titleInput = document.querySelector('.form__input_title');
  let linkInput = document.querySelector('.form__input_link');
  addCard(titleInput.value, linkInput.value);
  closePopupAdd();
};

formAdd.addEventListener('submit', addCardSubmitHandler);
