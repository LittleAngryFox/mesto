export class Card {
  constructor(data, handleCardClick, cardSelector) { //SelectorCard = "card__template"
    this._title = data.name;
    this._image = data.link;
    this._isLike = false;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { //шаблон
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".elements__item").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__img");
    this._setEventListeners();

    this._elementImg.src = this._image;
    this._elementImg.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }

  _handleMessageClickLike() {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
  }

  _handleMessageClickRemove() {
    this._element.querySelector(".element__remove").closest(".elements__item").remove();
    this._element = null;
  }

  _handleMessageClickImage() {
    this._handleCardClick(this._image, this._title);
  }

  _setEventListeners() {
    this._element.querySelector(".element__like-button").addEventListener("click", () => {
      this._handleMessageClickLike();
    });
    this._element.querySelector(".element__remove").addEventListener("click", () => {
      this._handleMessageClickRemove();
    });
    this._elementImg.addEventListener("click", () => {
      this._handleMessageClickImage();
    });
  }

}
