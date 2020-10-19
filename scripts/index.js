import { initialCards, object } from "./initial-сards.js";
import { openPopup, closePopup } from "./utils.js";
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

//создание экз. класса Card
const render = (data, selector, place) => {
  const card = new Card(data, selector);
  const cardElement = card.generateCard();

  switch (place) {
    case "append": {
      cardList.append(cardElement);
      break;
    }
    case "prepend": {
      cardList.prepend(cardElement);
      break;
    }
  }
}

initialCards.forEach((item) => {
  render(item, templateSelector, "append");
});

//активна кнопка или нет
const hasDisabledButton = (buttonElement) => {
  return buttonElement.classList.contains(object.inactiveButtonClass);
};

//редактирование профиля
const createProfileContent = (evt) => {
  evt.preventDefault();
  formProfile.activeButtonDefault();
  formProfile.removeErrorField();
  nameInput.value = profileTitle.textContent; //устанавливаем значения
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
};

//добавление картинок
const createAddContent = (evt) => {
  evt.preventDefault();
  formAdd.removeErrorField();
  urlImage.value = ""; //устанавливаем значения
  nameImage.value = "";
  openPopup(popupAdd);
};

//отслеживание отправки информации по профилю от пользователя
const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
  if (!hasDisabledButton(evt.submitter, "popup__button_disabled")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
    formProfile.removeErrorField();
  }
};

//отслеживание отправки информации по новой картинке от пользователя
const formSubmitHandlerAdd = (evt) => {
  if (!hasDisabledButton(evt.submitter, "popup__button_disabled")) {
    const data = { name: nameImage.value, link: urlImage.value };
    render(data, templateSelector, "prepend");
    popupContainerAdd.reset();
    evt.submitter.classList.add("popup__button_disabled");
    closePopup(popupAdd);
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

//включение валидации форм
const formProfile = new FormValidator(object, popupContainerEdit);
const formAdd = new FormValidator(object, popupContainerAdd);
formProfile.enableValidation();
formAdd.enableValidation();
