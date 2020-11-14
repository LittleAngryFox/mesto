export class FormValidator {
  constructor(objectForm, form) {
    this._formSelector = objectForm.formSelector,
      this._inputSelector = objectForm.inputSelector,
      this._setSelector = objectForm.setSelector,
      this._submitButtonSelector = objectForm.submitButtonSelector,
      this._inactiveButtonClass = objectForm.inactiveButtonClass,
      this._inputErrorClass = objectForm.inputErrorClass,
      this._errorClass = objectForm.errorClass;
    this._popupPlaceholder = objectForm.popupPlaceholder;
    this._formValidator = form;
    this._fieldset = null;
  }

  //запуск проверки на валидность
  enableValidation() {
    //валидируемая форма
    //обработчик отправки в форме
    this._formValidator.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //проверить на наличие ошибок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //обрабатываем поля ввода и кнопки
  _setEventListeners() {
    //список полей ввода в области
    this._inputList = Array.from(this._formValidator.querySelectorAll(this._inputSelector));
    //кнопка отправить в форме
    this._buttonElement = this._formValidator.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

  }

  //смена активации кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledButton();
    } else {
      this.activeButtonDefault();
    }
  };

  //проверка на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //показать ошибку
  _showInputError(inputElement) {
    const errorElement = this._formValidator.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  //скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formValidator.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";

  };

  //активация кнопки по умолчанию
  activeButtonDefault() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };


  disabledButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //скрытие ошибок при закрытии popup
  removeErrorField() {
    this._inputList.forEach(input => this._hideInputError(input));
  };

}
