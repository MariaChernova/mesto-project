function openPopup(modal) {
  modal.classList.add('popup_opened');
  window.onkeydown = (evt) => {
    if (evt.keyCode == 27) {
      closePopup(modal);
    }
  };
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  window.onkeydown = null;
}

export { openPopup, closePopup }
