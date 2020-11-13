export class Card {
  constructor(data, handleCardClick, handleDeleteClick, handleLikeClick, cardSelector) { //SelectorCard = "card__template"
    this._title = data.name;
    this._image = data.link;
    this._countlike = data.likes.length;
    this._like = data.likes;
    this._isLike = false;
    this._id = data._id;
    this._ownerid = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() { //шаблон
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".elements__item").cloneNode(true);

    return cardElement;
  }

  _activeMyLike() {
    this._like.forEach(element => {
      if (element._id == this._myId)
      this._likeButton.classList.add("element__like-button_active");
    });
  }

  stateLikeButton() {
    return this._likeButton.classList.contains("element__like-button_active");
  }

  activeLike() {
    this._likeButton.classList.add("element__like-button_active");
    this._elementLike.textContent ++;
  }

  disableLike() {
    this._likeButton.classList.remove("element__like-button_active");
    this._elementLike.textContent --;
  }

  _activeRemoveCard() {
    //если не карточка пользователя, то удалять нельзя
    if (this._ownerid != this._myId) {
      this._element.querySelector(".element__remove").remove();
    }
  }

  generateCard(myId) {
    this._myId = myId;
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__img");
    this._elementLike = this._element.querySelector(".element__like-count");
    this._element.id = this._id;
    this._elementImg.src = this._image;
    this._elementImg.alt = this._title;
    this._elementLike.textContent = this._countlike;
    this._likeButton = this._element.querySelector(".element__like-button");
    this._removeButton = this._element.querySelector(".element__remove");
    this._activeMyLike();
    this._activeRemoveCard();

    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }

  _handleMessageClickLike() {
    this._handleLikeClick();
  }

  _handleMessageClickRemove() {
    this._handleDeleteClick(this._element);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleMessageClickImage() {
    this._handleCardClick(this._image, this._title);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleMessageClickLike();
    });
    this._removeButton.addEventListener("click", () => {
      this._handleMessageClickRemove();
    });
    this._elementImg.addEventListener("click", () => {
      this._handleMessageClickImage();
    });
  }

}
