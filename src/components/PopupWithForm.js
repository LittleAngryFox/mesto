import Popup from "./Popup.js"
import {object} from "../utils/initial-сards.js"

export default class PopupWithForm extends Popup {
  constructor({ selectorPopup, formSubmitHandler }) {
    super(selectorPopup);
    this._formElement = document.querySelector(selectorPopup).querySelector(object.formSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(object.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setUserInfoForm({ heading, subheading }) {
    this._userName.textContent = heading;
    this._userDescription.textContent = subheading;
  }

  //активна кнопка или нет
  _hasDisabledButton(buttonElement) {
    return buttonElement.classList.contains(object.inactiveButtonClass);
  };

  _disabledButton(buttonElement) {
    buttonElement.classList.add(object.inactiveButtonClass);
  }

  setEventListeners() {
    super.setEventListeners();
    //отслеживание отправки данных профиля
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!this._hasDisabledButton(evt.submitter)) {
        this._formSubmitHandler(this._getInputValues());
        this._disabledButton(evt.submitter);
      }
    });
  }

  closePopup() {
    super.closePopup(this);

    this._formElement.reset();
  };

}

