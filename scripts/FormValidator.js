export class FormValidator {
  constructor(objectForm, form) {
    this._formSelector = objectForm.formSelector,
      this._inputSelector = objectForm.inputSelector,
      this._setSelector = objectForm.setSelector,
      this._submitButtonSelector = objectForm.submitButtonSelector,
      this._inactiveButtonClass = objectForm.inactiveButtonClass,
      this._inputErrorClass = objectForm.inputErrorClass,
      this._errorClass = objectForm.errorClass;
    this._formValidator = form;
  }

  //запуск проверки на валидность
  enableValidation = () => {
    //валидируемая форма
    //обработчик отправки в форме
    this._formValidator.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    //список областей ввода
    const fieldsetList = Array.from(this._formValidator.querySelectorAll(this._setSelector));

    //вешаем на поля ввода обработчики
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });

  }

  //проверить на наличие ошибок
  _checkInputValidity = (fieldset, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
    }
  };

  //обрабатываем поля ввода и кнопки
  _setEventListeners = (fieldset) => {

    //список полей ввода в области
    const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));

    //кнопка отправить в форме
    const buttonElement = fieldset.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(fieldset, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

  }

  //смена активации кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //проверка на валидность
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //показать ошибку
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //скрыть ошибку
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

}
