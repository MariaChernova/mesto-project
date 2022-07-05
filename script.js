function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

// Popup. User data changes
const editPopup = document.querySelector('.popup');
const nameField = document.querySelector('.profile__name');
const subtitleField = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__input_name');
const subtitleInput = document.querySelector('.form__input_subtitle');

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = nameField.textContent;
  subtitleInput.value = subtitleField.textContent;
};

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openEditPopup);


const buttonClose = editPopup.querySelector('.popup__button-close');
buttonClose.addEventListener('click', () => closePopup(editPopup));


function profileEditSubmitHandler(evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  subtitleField.textContent = subtitleInput.value;
  closePopup(editPopup);
};

const form = editPopup.querySelector('.form');
form.addEventListener('submit', profileEditSubmitHandler);


// Popup. Adding a card
const cardAddPopup = document.querySelector('.popup-add');

const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', () => openPopup(cardAddPopup));

const buttonCloseAdd = cardAddPopup.querySelector('.popup__button-close');
buttonCloseAdd.addEventListener('click', () => closePopup(cardAddPopup));

function addCard(title, link) {
  const cardItem = document.createElement('div');
  cardItem.innerHTML = `
    <button class="cards__trash-button" type="button" aria-label="Удалить"></button>
    <img class="cards__image" src="${link}" alt="">
    <div class="cards__info">
      <h2 class="cards__location">${title}</h2>
      <button class="cards__icon" type="button" aria-label="Like it"></button>
    </div>`;
  cardItem.classList.add('cards__item');
  
  const cards = document.querySelector('.cards');
  cards.insertBefore(cardItem, cards.childNodes[0]);

  const like = cardItem.querySelector('.cards__icon');
  like.addEventListener('click', likeClickHandler);

  const trash = cardItem.querySelector('.cards__trash-button');
  trash.addEventListener('click', deleteCardHandler);

  const image = cardItem.querySelector('.cards__image');
  image.addEventListener('click', openPopupImg);
};

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const titleInput = document.querySelector('.form__input_title');
  const linkInput = document.querySelector('.form__input_link');
  addCard(titleInput.value, linkInput.value);
  closePopup(cardAddPopup);
};

const formAdd = cardAddPopup.querySelector('.form');
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

const buttonCloseImg = popupImg.querySelector('.popup__button-close');
buttonCloseImg.addEventListener('click', () => closePopup(popupImg));

const images = document.querySelectorAll('.cards__image');

images.forEach(button => {
  button.addEventListener('click', openPopupImg);
});

function openPopupImg(evt) {
  const image = popupImg.querySelector('.popup-image__img');
  image.src = evt.currentTarget.src;

  const description = popupImg.querySelector('.popup-image__img-description');
  const card = evt.currentTarget.closest('.cards__item');
  const location = card.querySelector('.cards__location');
  description.textContent = location.textContent;

  openPopup(popupImg);
}
