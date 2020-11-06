import Popup from "./Popup.js"
import { object } from "../utils/initial-сards.js"

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

  setEventListeners() {
    super.setEventListeners();
    //отслеживание отправки данных профиля
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup(this);

    this._formElement.reset();
  };

}

