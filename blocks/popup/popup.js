const content = document.querySelector(".content");
//-------------------------------------
const popupEdit = content.querySelector(".popup_edit-profile"); //блок редактирования профиля
const popupAdd = content.querySelector(".popup_add"); //блок добавления катинки
const popupImg = content.querySelector(".popup__image"); //блок добавления увеличенной катинки
//-------------------------------------
const profile = content.querySelector(".profile");//Информация о имени и сфере деятельности
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
let popupImgItem = popupImg.querySelector(".popup__img-item"); //Информация о картинке
let popupCaption = popupImg.querySelector(".popup__caption");
//-------------------------------------
const editButton = profile.querySelector(".profile__edit-button"); //кнопка редактирования
const addButton = profile.querySelector(".profile__add-button"); //кнопка добавления
//-------------------------------------
const popupContainerEdit = content.querySelector(".popup__container_edit"); //форма редактирования
const popupContainerAdd = content.querySelector(".popup__container_add"); //форма редактирования
//-------------------------------------
let nameInput = popupEdit.querySelector("#heading"); //Инпуты
let jobInput = popupEdit.querySelector("#subheading");
let nameImage = popupAdd.querySelector("#picture");
let urlImage = popupAdd.querySelector("#imgurl");
//-------------------------------------
const cardTemplate = document.querySelector('#card').content; //Шаблон места под картинку
const cardList = document.querySelector('.elements__list');
//-------------------------------------
const initialCards = [ //начальные картинки
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//-------------------------------------

//Заполнение шаблона картинки в галлерее
function addList(itemLink, itemName) {
  //копия шаблона
  const userElement = cardTemplate.cloneNode(true);
  userElement.querySelector('.element__img').src = itemLink;
  userElement.querySelector('.element__title').textContent = itemName;
  userElement.querySelector('.element__img').alt = itemName;
  userElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  })
  userElement.querySelector('.element__remove').addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();
  });

  userElement.querySelector('.element__img').addEventListener('click', function (evt) {
    maxImg(evt);
    const exitImg = popupImg.querySelector(".popup__close-button_img");
    exitImg.addEventListener("click", function () { popupImg.classList.remove("popup_opened") });
  });

  return userElement;
}

// наполняем начальным содержимым
initialCards.forEach(function (item) {
  const card = addList(item.link, item.name);
  appendCard(cardList, card);
});

//открытие popup редактирование пользователя
function profileInfoEditOpened() {
  popupEdit.classList.toggle("popup_opened"); //делает popup видимым
  nameInput.value = profileTitle.textContent; //устанавливаем начальное значение
  jobInput.value = profileSubtitle.textContent;
}

//открытие popup добавления картинки
function imageAddOpened() {
  popupAdd.classList.toggle("popup_opened"); //делает popup видимым
  urlImage.value = "";
  nameImage.value = "";
}

//закрытие popup
function profileInfoEditClosed(evt) {
  evt.preventDefault();
  const eventTargetClose = evt.target;
  eventTargetClose.parentElement.classList.toggle("popup_opened");
}

//отслеживание отправки информации от пользователя
function formSubmitHandler(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;

  //редактируется профиль
  if (eventTarget.classList.contains("popup__container_edit")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  }

  //добавляется картинка
  if (eventTarget.classList.contains("popup__container_add")) {
    const card = addList(urlImage.value, nameImage.value);
    appendCard(cardList, card);
  }

  //после сохранения закрываем popup
  profileInfoEditClosed(evt);
}

//отображение информации на странице. добавление в начало
function appendCard(place, element) {
  place.prepend(element);
  return;
}

//открытие картинки
function maxImg(evt) {
  popupImg.classList.add("popup_opened");
  popupImgItem.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
}

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", profileInfoEditOpened);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", imageAddOpened);

//отслеживание отправки данных профиля
popupContainerEdit.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна профиля
popupContainerEdit.addEventListener("reset", profileInfoEditClosed);

//отслеживание отправки данных картинки
popupContainerAdd.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна картинки
popupContainerAdd.addEventListener("reset", profileInfoEditClosed);

