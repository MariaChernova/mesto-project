import { closePopup, openPopupImg } from './modal.js';
import { cardAddPopup } from '../index.js';

export { addDefaultCards, submitAddCard };

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');
const cardTitleInput = document.querySelector('.form__input_title');
const cardLinkInput = document.querySelector('.form__input_link');


const elbrusImage = new URL('../images/elbrus.jpg', import.meta.url);
const beluhaImage = new URL('../images/beluha.jpg', import.meta.url);
const kazbegImage = new URL('../images/kazbeg.jpg', import.meta.url);
const kljuchevskajaImage = new URL('../images/kljuchevskaja-sopka.jpg', import.meta.url);
const koshtanImage = new URL('../images/koshtan-tau.jpg', import.meta.url);
const munkuImage = new URL('../images/munku-sardyk.jpg', import.meta.url);

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

function addDefaultCards() {
  defaultCards.forEach(card => {
    const cardItem = createCard(card.title, card.link);
    renderCard(cardsContainer, cardItem);
  });
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
