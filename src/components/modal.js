function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

export { openPopup, closePopup }
