function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function closeOpenedPopup() {
  const popup = document.querySelector('.popup_opened');
  if (popup)
    closePopup(popup);
}

export { openPopup, closePopup, closeOpenedPopup }
