//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//скрыть ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};
//проверить на наличие ошибок
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};
//обрабатываем поля ввода и кнопки
const setEventListeners = (fieldset, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  //список полей ввода в области
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  //кнопка отправить в форме
  const buttonElement = fieldset.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {

    inputElement.addEventListener("input", function () {
      checkInputValidity(fieldset, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
//запуск проверки на валидность
const enableValidation = (formSelector, inputSelector, setSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  //список форм
  const formList = Array.from(document.querySelectorAll(formSelector));

  //обработчик отправки в форме
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //список областей ввода
    const fieldsetList = Array.from(formElement.querySelectorAll(setSelector));
    fieldsetList.forEach((fieldset) => {
      //вешаем на поля ввода обработчики
      setEventListeners(fieldset, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
  });
};
//проверка на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
//смена активации кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//активна кнопка или нет
const hasDisabledButton = (buttonElement, inactiveButtonClass) => {
  return buttonElement.classList.contains(inactiveButtonClass)
};


