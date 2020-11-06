const initialCards = [ //начальные картинки
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];


const object = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  setSelector: ".popup__input-container",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
  popupPlaceholder: ".popup__placeholder"
};

export const content = document.querySelector(".content");
export const profile = content.querySelector(".profile");//Информация о имени и сфере деятельности
export const editButton = profile.querySelector(".profile__edit-button"); //кнопка редактирования
export const addButton = profile.querySelector(".profile__add-button"); //кнопка добавления
export const popupContainerEdit = document.querySelector(".popup__container_edit"); //форма редактирования
export const popupContainerAdd = document.querySelector(".popup__container_add"); //форма редактирования
export const templateSelector = ".card__template";
export const nameInput = document.querySelector(".popup_edit-profile").querySelector(".popup__input_heading"); //Инпуты
export const jobInput = document.querySelector(".popup_edit-profile").querySelector(".popup__input_subheading");
export const nameImage = document.querySelector(".popup_add").querySelector(".popup__input_picture");
export const urlImage = document.querySelector(".popup_add").querySelector(".popup__input_imgurl");

export { initialCards, object };
