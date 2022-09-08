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

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button-inactive');
  } else {
    buttonElement.classList.remove('form__button-inactive');
  };
};

// Включаем валидацию формы

function enableFormValidation(formElement, inputValidationCallback) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButton = formElement.querySelector('.form__button');
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener('input', () => {
      inputValidationCallback(inputElement, errorElement);
      toggleButtonState(inputList, submitButton);
    });
  });
}