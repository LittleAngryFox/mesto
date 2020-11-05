export default class Popup {
  constructor(selectorPopup) {
    this._popupForm = document.querySelector(selectorPopup);
  }

  openPopup() {
    this._popupForm.classList.add("popup_opened");
    //закрытие через esc
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    //закрытие по нажатию на оверлей
    document.addEventListener("mousedown", this._closeOverlayPopup.bind(this));
    this.setEventListeners();
  };

  closePopup() {
    this._popupForm.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    document.removeEventListener("mousedown", this._closeOverlayPopup.bind(this));
  };

  //закрытие по клавише esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  //закрытие по нажатию на overlay
  _closeOverlayPopup(evt) {
    if (evt.target.classList.contains("popup")) {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupForm.querySelector(".popup__close-button").addEventListener("click", () => { this.closePopup(); });
  }

}
