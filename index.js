const content = document.querySelector(".content");

const popupEdit = document.querySelector(".popup_edit-profile"); //блок редактирования профиля
const popupAdd = document.querySelector(".popup_add"); //блок добавления катинки
const popupImg = document.querySelector(".popup_image"); //блок добавления увеличенной катинки

const profile = content.querySelector(".profile");//Информация о имени и сфере деятельности
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupImgItem = popupImg.querySelector(".popup__img-item"); //Информация о картинке
const popupCaption = popupImg.querySelector(".popup__caption");

const editButton = profile.querySelector(".profile__edit-button"); //кнопка редактирования
const addButton = profile.querySelector(".profile__add-button"); //кнопка добавления

const popupContainerEdit = document.querySelector(".popup__container_edit"); //форма редактирования
const popupContainerAdd = document.querySelector(".popup__container_add"); //форма редактирования

const nameInput = popupEdit.querySelector(".popup__input_heading"); //Инпуты
const jobInput = popupEdit.querySelector(".popup__input_subheading");
const nameImage = popupAdd.querySelector(".popup__input_picture");
const urlImage = popupAdd.querySelector(".popup__input_imgurl");
const cardTemplate = document.querySelector(".card__template").content; //Шаблон места под картинку
const cardList = document.querySelector(".elements__list");


//открытие/закрытие popup окон
const openPopup = (popupForm) => {
  popupForm.classList.add("popup_opened");
  //закрытие через esc
  document.addEventListener("keydown", keyEsc);
  //закрытие по нажатию на оверлей
  document.addEventListener("mousedown", closeOverlayPopup);
};

const closePopup = (popupForm) => {
  popupForm.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyEsc);
  document.removeEventListener("mousedown", closeOverlayPopup);
};

const activeButtonDefault = (form) => {
  const buttonElement = form.querySelector(".popup__button");
  buttonElement.classList.remove("popup__button_disabled");
};

const createProfileContent = (evt) => {
  evt.preventDefault();
  activeButtonDefault(popupContainerEdit);
  removeErrorField(popupContainerEdit);
  nameInput.value = profileTitle.textContent; //устанавливаем значения
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
};

const createAddContent = (evt) => {
  evt.preventDefault();
  removeErrorField(popupContainerAdd);
  urlImage.value = ""; //устанавливаем значения
  nameImage.value = "";
  openPopup(popupAdd);
};

//создание карточки с изображением и подписями
const createImagePopup = (evt) => {
  evt.preventDefault();
  popupImgItem.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImgItem.alt = evt.target.alt;
  openPopup(popupImg);
};

//открытие увеличенной картинки
const showImagePopup = (evt) => {
  createImagePopup(evt);
  const exitImg = popupImg.querySelector(".popup__close-button_img");
  exitImg.addEventListener("click", () => { closePopup(popupImg); });
};

//изменение карточек (лайк, удаление, открытие)
const changeOfCardState = (evt) => {
  if (evt.target.classList.contains("element__like-button")) {
    likeCard(evt);
  }
  if (evt.target.classList.contains("element__remove")) {
    removeCard(evt);
  }
  if (evt.target.classList.contains("element__img")) {
    showImagePopup(evt);
  }
};

//изменение активности лайка
const likeCard = (evt) => {
  evt.target.classList.toggle("element__like-button_active");
};

//удаление карточки
const removeCard = (evt) => {
  evt.target.closest(".elements__item").remove();
};

//скрытие ошибок при закрытии popup
const removeErrorField = (form) => {
  const errorList = Array.from(form.querySelectorAll(".popup__placeholder"));
  const inputList = Array.from(form.querySelectorAll(".popup__input"));

  errorList.forEach((errorElement) => {
    if (errorElement.classList.contains("popup__input-error_active")) {
      errorElement.classList.remove("popup__input-error_active");
    }
  });

  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains("popup__input-error")) {
      inputElement.classList.remove("popup__input-error");
    }
  });
};

//Заполнение шаблона картинки в галерее
const createCard = (itemLink, itemName) => {
  //копия шаблона
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".element__img");
  cardImg.src = itemLink;
  card.querySelector(".element__title").textContent = itemName;
  cardImg.alt = itemName;
  return card;
};

// наполняем начальным содержимым
initialCards.forEach(function (item) {
  const card = createCard(item.link, item.name);
  cardList.append(card);
});

//отображение информации на странице. добавление в начало
const renderCard = (place, element) => {
  place.prepend(element);
};

//отслеживание отправки информации по профилю от пользователя
const formSubmitHandlerEdit = (evt) => {
  const eventTarget = evt.target;
  if (!hasDisabledButton(evt.submitter, "popup__button_disabled")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
    removeErrorField(popupContainerEdit);
  }
};

//отслеживание отправки информации по новой картинке от пользователя
const formSubmitHandlerAdd = (evt) => {
  const eventTarget = evt.target;
  if (!hasDisabledButton(evt.submitter, "popup__button_disabled")) {
    const card = createCard(urlImage.value, nameImage.value);
    renderCard(cardList, card);
    popupContainerAdd.reset();
    evt.submitter.classList.add("popup__button_disabled");
    closePopup(popupAdd);
  }
};

//закрытие по клавише esc
const keyEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//закрытие по нажатию на overlay
const closeOverlayPopup = (evt) => {
  if (evt.target.classList.contains("popup")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", createProfileContent);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", createAddContent);
//отслеживание отправки данных профиля
popupContainerEdit.addEventListener("submit", formSubmitHandlerEdit);
//отслеживание отправки данных картинки
popupContainerAdd.addEventListener("submit", formSubmitHandlerAdd);
//отслеживание закрытия окна профиля
popupContainerEdit.addEventListener("reset", () => { closePopup(popupEdit) });
//отслеживание закрытия окна картинки
popupContainerAdd.addEventListener("reset", () => { closePopup(popupAdd) });
//действия над карточкой (лайк, открытие, удаление)
cardList.addEventListener("click", changeOfCardState);

enableValidation(object.formSelector, object.inputSelector, object.setSelector, object.submitButtonSelector, object.inactiveButtonClass, object.inputErrorClass, object.errorClass);

