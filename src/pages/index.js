import "./index.css";
import {
  initialCards,
  object,
  editButton, addButton,
  popupContainerEdit, popupContainerAdd,
  templateSelector,
  nameInput, jobInput, nameImage, urlImage
} from "../utils/initial-сards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const imagePopup = new PopupWithImage(".popup_image");
const handleCardClick = (image, title) => imagePopup.openPopup(image, title);

const render = (data, place) => {
  const card = new Card(data, handleCardClick, templateSelector);
  const cardElement = card.generateCard();
  cardListInit.addItem(cardElement, place);
}

//инициализация
const cardListInit = new Section({
  data: initialCards,
  renderer: (item) => {
    render(item, "append");
  },
}, ".elements__list");

//отрисовка начальных карточек
cardListInit.renderItems();

//информация профиля
const userProrile = new UserInfo({
  selectorUserName: ".profile__title",
  selectoruserDescription: ".profile__subtitle"
});

//редактирование профиля
const popupWithFormProfile = new PopupWithForm({
  selectorPopup: ".popup_edit-profile",
  formSubmitHandler: (data) => {
    userProrile.setUserInfo(data);
    popupWithFormProfile.closePopup();
    formProfile.removeErrorField();
  }
});

//иницилизация попапа редактирования профиля
const createProfileContent = (evt) => {
  evt.preventDefault();

  const info = userProrile.getUserInfo();
  nameInput.value = info.name; //устанавливаем значения
  jobInput.value = info.description;

  formProfile.activeButtonDefault();
  formProfile.removeErrorField();
  popupWithFormProfile.openPopup();
};

//добавление карточек
const popupWithFormAdd = new PopupWithForm({
  selectorPopup: ".popup_add",
  formSubmitHandler: (data) => {
    render({ name: data["name-picture"], link: data["imgurl"] }, "prepend");
    cardListInit.renderItems();
    popupWithFormAdd.closePopup();
  }
});

//иницилизация попапа добавления карточек
const createAddContent = (evt) => {
  evt.preventDefault();
  formAdd.disabledButton();
  formAdd.removeErrorField();
  urlImage.value = ""; //устанавливаем значения
  nameImage.value = "";

  popupWithFormAdd.openPopup();
};

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", createProfileContent);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", createAddContent);

//отслеживание закрытия на крестик
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
imagePopup.setEventListeners();

//включение валидации форм
const formProfile = new FormValidator(object, popupContainerEdit);
const formAdd = new FormValidator(object, popupContainerAdd);
formProfile.enableValidation();
formAdd.enableValidation();
