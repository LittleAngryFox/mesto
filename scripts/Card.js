import { openPopup, closePopup } from "./index.js"

export class Card {
  constructor(data, cardSelector) { //SelectorCard = "card__template"
    this._title = data.name;
    this._image = data.link;
    this._isLike = false;
    this._cardSelector = cardSelector;
  }

  _getTemplate = () => { //шаблон
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".elements__item").cloneNode(true);

    return cardElement;
  }


  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__img").src = this._image;
    this._element.querySelector(".element__img").alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }

  _handleMessageClickLike = () => {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
  }

  _handleMessageClickRemove = () => {
    this._element.querySelector(".element__remove").closest(".elements__item").remove();
    this._element = null;
  }

  _handleMessageClickImage = () => {
    const popupImg = document.querySelector(".popup_image"); //блок добавления увеличенной катинки
    const popupImgItem = popupImg.querySelector(".popup__img-item"); //Информация о картинке
    const popupCaption = popupImg.querySelector(".popup__caption");
    popupImgItem.src = this._image;
    popupCaption.textContent = this._title;
    popupImgItem.alt = this._title;

    openPopup(popupImg);

    const exitImg = popupImg.querySelector(".popup__close-button_img");
    exitImg.addEventListener("click", () => { closePopup(popupImg); });
  }

  _setEventListeners = () => {
    this._element.querySelector(".element__like-button").addEventListener("click", () => {
      this._handleMessageClickLike();
    });
    this._element.querySelector(".element__remove").addEventListener("click", () => {
      this._handleMessageClickRemove();
    });
    this._element.querySelector(".element__img").addEventListener("click", () => {
      this._handleMessageClickImage();
    });
  }

}
