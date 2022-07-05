const editPopup = document.querySelector('.popup');
const nameField = document.querySelector('.profile__name');
const subtitleField = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__input_name');
const subtitleInput = document.querySelector('.form__input_subtitle');

const cardsContainer = document.querySelector('.cards');

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

function createCard(title, link) {
  const cardItem = document.getElementById('card-template').content.cloneNode(true);

  const cardsImage = cardItem.querySelector('.cards__image');
  cardsImage.src = link;
  
  const cardsLocation = cardItem.querySelector('.cards__location');
  cardsLocation.textContent = title;

  const like = cardItem.querySelector('.cards__icon');
  like.addEventListener('click', likeClickHandler);

  const trash = cardItem.querySelector('.cards__trash-button');
  trash.addEventListener('click', deleteCardHandler);

  const image = cardItem.querySelector('.cards__image');
  image.addEventListener('click', openPopupImg);
  
  return cardItem;
};

function renderCard(container, card) {  
  container.insertBefore(card, container.childNodes[0]);
};

// Popup. User data changes

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


function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const titleInput = document.querySelector('.form__input_title');
  const linkInput = document.querySelector('.form__input_link');
  const card = createCard(titleInput.value, linkInput.value);
  
  renderCard(cardsContainer, card);

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

defaultCards.forEach(card => {
  const cardItem = createCard(card.title, card.link);
  renderCard(cardsContainer, cardItem);
});
