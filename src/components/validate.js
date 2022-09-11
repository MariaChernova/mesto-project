function validateFormInput(inputElement, errorElement) {
  if (inputElement.validity.valid) {
    errorElement.textContent = "";
  } else if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.patternError;
  } else {
    errorElement.textContent = inputElement.validationMessage;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState({inactiveButtonClass}, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  };
};

function errorFieldForInput(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-error`);
}

function enableFormValidation(cfg, formElement) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const submitButton = formElement.querySelector(cfg.submitButtonSelector);
  inputList.forEach((inputElement) => {
    const errorElement = errorFieldForInput(formElement, inputElement);
    inputElement.addEventListener('input', () => {
      validateFormInput(inputElement, errorElement);
      toggleButtonState(cfg, inputList, submitButton);
    });
  });
}

function validateForm(cfg, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const submitButton = formElement.querySelector(cfg.submitButtonSelector);
  toggleButtonState(cfg, inputList, submitButton);
  inputList.forEach((inputElement) => {
    const errorElement = errorFieldForInput(formElement, inputElement);
    validateFormInput(inputElement, errorElement);
  });
}

function validateFormButton(cfg, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const submitButton = formElement.querySelector(cfg.submitButtonSelector);
  toggleButtonState(cfg, inputList, submitButton);
}

function enableValidation(cfg) {
  const forms = Array.from(document.querySelectorAll(cfg.formSelector));
  forms.forEach((form) => {
    enableFormValidation(cfg, form);
  });
}

export { enableValidation, validateForm, validateFormButton };
