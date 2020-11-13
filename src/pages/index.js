import "./index.css";
import {
  object,
  imageCard,
  editButton, addButton, updateButton,
  popupContainerEdit, popupContainerAdd, popupContainerUpdate,
  templateSelector,
  nameInput, jobInput, nameImage, urlImage, avatarUrlImage
} from "../utils/initial-сards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

//открытие картинки
const imagePopup = new PopupWithImage(".popup_image");

//обработчик открытия картинки
const handleCardClick = (image, title) => imagePopup.openPopup(image, title);

//обработчик удаление карточки
const handleDeleteClick = (card) => { popupDeleteConfirmation.card = card; popupDeleteConfirmation.openPopup(); }

//место карточек
const cardListInit = new Section({
  data: [],
  renderer: (item) => {
    render(item, "append");
  },
}, ".elements__list");

//запросы к серверу
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'ad8091c0-2087-4b81-9f1c-48d02b521a18',
    'Content-Type': 'application/json'
  }
});

//создание "шаблона" информации профиля
const userProrile = new UserInfo({
  selectorUserName: ".profile__title",
  selectorUserDescription: ".profile__subtitle",
  selectorAvatar: ".profile__photo"
});

//инициализация информации профиля при загрузке
api.getUserInfo()
  .then((result) => {
    userProrile.renderUserInfo(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })

//редактирование профиля
const popupWithFormProfile = new PopupWithForm({
  selectorPopup: ".popup_edit-profile",
  formSubmitHandler: (dataInput) => {
    popupWithFormProfile.waitLoad("Сохранение...");

    api.patchUserInfo({ name: dataInput["heading"], about: dataInput["subheading"] })
      .then((data) => {
        userProrile.setUserInfo(data);
        popupWithFormProfile.closePopup();
        formProfile.removeErrorField();
      })
      .catch((err) => {
        popupWithFormProfile.closePopup();
        formProfile.removeErrorField();
        popupWithFormProfile.endLoad();
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupWithFormProfile.endLoad();
      })
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

//инициализация карточек
api.getInitialCards()
  .then((result) => {
    cardListInit.renderItems(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })

//подтверждение удаления карточки
const popupDeleteConfirmation = new PopupWithConfirm({
  selectorPopup: ".popup_delete-confirmation",
  formSubmitHandler: () => {
    api.deleteMyCard(popupDeleteConfirmation.card.id)
      .then((result) => {
        document.getElementById(popupDeleteConfirmation.card.id).remove();
      })
      .then(() => {
        popupDeleteConfirmation.closePopup();
      })
      .catch((err) => {
        popupDeleteConfirmation.closePopup();
        console.log(err); // выведем ошибку в консоль
      })
  }
});

const render = (data, place) => {

  //лайки
  const handleLikeClick = () => {
    if (card.stateLikeButton()) {
      api.deleteLike(card._id)
        .then(() => {
          card.disableLike();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
    }
    else {
      api.activeLike(card._id)
        .then(() => {
          card.activeLike();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })

    }
  }

  //создание и отрисовка карточек
  const card = new Card(data, handleCardClick, handleDeleteClick, handleLikeClick, templateSelector);
  const cardElement = card.generateCard(userProrile.getmyId());
  cardListInit.addItem(cardElement, place);
}

//обновление аватара
const popupWithUpdateAvatar = new PopupWithForm({
  selectorPopup: ".popup_update-avatar",
  formSubmitHandler: (dataInput) => {

    popupWithUpdateAvatar.waitLoad("Сохранение...");
    api.patchUserAvatar({ avatar: dataInput["imgurl"] })
      .then((data) => {
        imageCard.src = data.avatar;
        popupWithUpdateAvatar.closePopup();
        formUpdate.removeErrorField();

      })
      .catch((err) => {
        popupWithUpdateAvatar.closePopup();
        formUpdate.removeErrorField();
        popupWithUpdateAvatar.endLoad();

        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupWithUpdateAvatar.endLoad();
      })
  }
});

//инициализация попапа обновления аватара
const updateAvatar = (evt) => {
  evt.preventDefault();
  formUpdate.disabledButton();
  formUpdate.removeErrorField();
  avatarUrlImage.value = "";

  popupWithUpdateAvatar.openPopup();
}

//добавление карточек
const popupWithFormAdd = new PopupWithForm({
  selectorPopup: ".popup_add",
  formSubmitHandler: (dataInput) => {

    popupWithFormAdd.waitLoad("Создание...");
    api.postCard({ name: dataInput["name-picture"], link: dataInput["imgurl"] })
      .then((data) => {
        render(data, "prepend");
        popupWithFormAdd.closePopup();
      })
      .catch((err) => {
        popupWithFormAdd.closePopup();
        console.log(err); // выведем ошибку в консоль
        popupWithFormAdd.endLoad();
      })
      .finally(() => {
        popupWithFormAdd.endLoad();
      })
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

updateButton.addEventListener("click", updateAvatar);
//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", createProfileContent);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", createAddContent);

//отслеживание нажатия на кнопки
popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
imagePopup.setEventListeners();
popupWithUpdateAvatar.setEventListeners();
popupDeleteConfirmation.setEventListeners();

//включение валидации форм
const formProfile = new FormValidator(object, popupContainerEdit);
const formAdd = new FormValidator(object, popupContainerAdd);
const formUpdate = new FormValidator(object, popupContainerUpdate);
formProfile.enableValidation();
formAdd.enableValidation();
formUpdate.enableValidation();
