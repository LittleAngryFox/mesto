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
import Popup from "../components/Popup.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";



//создание экз. класса Card
const cardListInit = new Section({
  data: initialCards,
  renderer: (item) => {
    const imagePopup = new PopupWithImage(".popup_image");
    const handleCardClick = (image, title) => imagePopup.openPopup(image, title);
    const card = new Card(item, handleCardClick, templateSelector);

    const cardElement = card.generateCard();

    cardListInit.addItem(cardElement, "append");

  },
}, ".elements__list");

//отрисовка начальных карточек
cardListInit.renderItems();

const popupEdit = new Popup(".popup_edit-profile");
const popupAdd = new Popup(".popup_add");

const userProrile = new UserInfo({
  selectorUserName: ".profile__title",
  selectoruserDescription: ".profile__subtitle"
});

//редактирование профиля
const createProfileContent = (evt) => {
  evt.preventDefault();

  const info = userProrile.getUserInfo();
  nameInput.value = info.name; //устанавливаем значения
  jobInput.value = info.description;

  formProfile.activeButtonDefault();
  formProfile.removeErrorField();
  popupEdit.openPopup();
};

//добавление картинок
const createAddContent = (evt) => {
  evt.preventDefault();
  formAdd.removeErrorField();

  urlImage.value = ""; //устанавливаем значения
  nameImage.value = "";

  popupAdd.openPopup();
};

const popupWithFormProfile = new PopupWithForm({
  selectorPopup: ".popup_edit-profile",
  formSubmitHandler: (data) => {
    userProrile.setUserInfo(data);
    popupWithFormProfile.closePopup();
    formProfile.removeErrorField();
  }
});

const popupWithFormAdd = new PopupWithForm({
  selectorPopup: ".popup_add",
  formSubmitHandler: (data) => {
    const cardListAdd = new Section({
      data: [data],
      renderer: (item) => {
        const imagePopup = new PopupWithImage(".popup_image");
        const handleCardClick = (image, title) => imagePopup.openPopup(image, title);
        const card = new Card({ name: item["name-picture"], link: item["imgurl"] }, handleCardClick, templateSelector);
        const cardElement = card.generateCard();

        cardListAdd.addItem(cardElement, "prepend");
      },
    }, ".elements__list");

    cardListAdd.renderItems();
    popupWithFormAdd.closePopup();
  }
});

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", createProfileContent);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", createAddContent);

//отслеживание отправки данных форм
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();

//включение валидации форм
const formProfile = new FormValidator(object, popupContainerEdit);
const formAdd = new FormValidator(object, popupContainerAdd);
formProfile.enableValidation();
formAdd.enableValidation();
