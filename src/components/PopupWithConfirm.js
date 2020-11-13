import Popup from "./Popup.js"
import { object } from "../utils/initial-сards.js"

export default class PopupWithConfirm extends Popup {
  constructor({ selectorPopup, formSubmitHandler }) {
    super(selectorPopup);
    this._formElement = document.querySelector(selectorPopup).querySelector(object.formSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    //отслеживание отправки данных профиля
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
  }
}

