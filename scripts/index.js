import { initialCards, object } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const content = document.querySelector(".content");

const popupEdit = document.querySelector(".popup_edit-profile"); //блок редактирования профиля
const popupAdd = document.querySelector(".popup_add"); //блок добавления катинки

const profile = content.querySelector(".profile");//Информация о имени и сфере деятельности
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

const editButton = profile.querySelector(".profile__edit-button"); //кнопка редактирования
const addButton = profile.querySelector(".profile__add-button"); //кнопка добавления

const popupContainerEdit = document.querySelector(".popup__container_edit"); //форма редактирования
const popupContainerAdd = document.querySelector(".popup__container_add"); //форма редактирования

const nameInput = popupEdit.querySelector(".popup__input_heading"); //Инпуты
const jobInput = popupEdit.querySelector(".popup__input_subheading");
const nameImage = popupAdd.querySelector(".popup__input_picture");
const urlImage = popupAdd.querySelector(".popup__input_imgurl");
const cardList = document.querySelector(".elements__list");
const templateSelector = ".card__template";

initialCards.forEach((item) => {
  const card = new Card(item, templateSelector);
  const cardElement = card.generateCard();

  cardList.append(cardElement);
});

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

//активна кнопка или нет
const hasDisabledButton = (buttonElement) => {
  return buttonElement.classList.contains(object.inactiveButtonClass);
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

//отслеживание отправки информации по профилю от пользователя
const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
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
  // evt.preventDefault();
  const eventTarget = evt.target;
  if (!hasDisabledButton(evt.submitter, "popup__button_disabled")) {
    const data = { name: nameImage.value, link: urlImage.value };
    const card = new Card(data, templateSelector);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    //const card = createCard(urlImage.value, nameImage.value);
    //renderCard(cardList, card);
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

const formProfile = new FormValidator(object, popupContainerEdit);
const formAdd = new FormValidator(object, popupContainerAdd );
formProfile.enableValidation();
formAdd.enableValidation();

export { openPopup, closePopup };
