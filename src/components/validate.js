// Валидация поля ввода

function validateFormInput(inputElement, errorElement) {
  if (inputElement.validity.valid) {
    errorElement.textContent = "";
  } else if (inputElement.validity.patternMismatch) {
    errorElement.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
  } else {
    errorElement.textContent = inputElement.validationMessage;
  }
}

// Проверка на ошибки в полях ввода

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Кнопка неактивна

function toggleButtonState(cfg, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(cfg.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(cfg.inactiveButtonClass);
  };
};

// Включаем валидацию формы

function enableFormValidation(cfg, formElement) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const submitButton = formElement.querySelector(cfg.submitButtonSelector);
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener('input', () => {
      validateFormInput(inputElement, errorElement);
      toggleButtonState(cfg, inputList, submitButton);
    });
  });
}

function enableValidation(cfg) {
  const forms = Array.from(document.querySelectorAll(cfg.formSelector));
  forms.forEach((form) => {
    enableFormValidation(cfg, form);
  });
}
