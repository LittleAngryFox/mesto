import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupForm = document.querySelector(selector);
  }

  openPopup(image, title) {

    const popupImgItem = this._popupForm.querySelector(".popup__img-item"); //Информация о картинке
    const popupCaption = this._popupForm.querySelector(".popup__caption");
    popupImgItem.src = image;
    popupCaption.textContent = title;
    popupImgItem.alt = title;

    super.openPopup();

    const exitImg = this._popupForm.querySelector(".popup__close-button_img");
    exitImg.addEventListener("click", () => { super.closePopup(); });
  }

}
