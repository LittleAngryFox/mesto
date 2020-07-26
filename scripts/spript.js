const content = document.querySelector(".content");
//-------------------------------------
const popupEdit = content.querySelector(".popup_edit-profile"); //блок редактирования профиля
const popupAdd = content.querySelector(".popup_add"); //блок добавления катинки
const popupImg = content.querySelector(".popup_image"); //блок добавления увеличенной катинки
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
const nameInput = popupEdit.querySelector(".popup__item_heading"); //Инпуты
const jobInput = popupEdit.querySelector(".popup__item_subheading");
const nameImage = popupAdd.querySelector(".popup__item_picture");
const urlImage = popupAdd.querySelector(".popup__item_imgurl");
//-------------------------------------
const cardTemplate = document.querySelector(".card__template").content; //Шаблон места под картинку
const cardList = document.querySelector(".elements__list");
//-------------------------------------



//открытие картинки
function openingBigImage(evt) {
  popupImg.classList.add("popup_opened");
  popupImgItem.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImgItem.alt = evt.target.alt;
}

//Заполнение шаблона картинки в галлерее
function createCard(itemLink, itemName) {
  //копия шаблона
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".element__img");
  cardImg.src = itemLink;
  card.querySelector(".element__title").textContent = itemName;
  cardImg.alt = itemName;
  card.querySelector(".element__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-button_active");
  })
  card.querySelector(".element__remove").addEventListener("click", function (evt) {
    evt.target.closest(".elements__item").remove();
  });

  cardImg.addEventListener("click", function (evt) {
    openingBigImage(evt);
    const exitImg = popupImg.querySelector(".popup__close-button_img");
    exitImg.addEventListener("click", function () { popupImg.classList.remove("popup_opened") });
  });

  return card;
}

// наполняем начальным содержимым
initialCards.forEach(function (item) {
  const card = createCard(item.link, item.name);
  cardList.append(card);
});

//отображение информации на странице. добавление в начало
function renderCard(place, element) {
  place.prepend(element);
  return;
}

//открытие/закрытие popup окон
function displayPopupItem(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;

  //редактируется профиль
  if (eventTarget.classList.contains("profile__edit-button")) {
    popupEdit.classList.toggle("popup_opened");
    nameInput.value = profileTitle.textContent; //устанавливаем значения
    jobInput.value = profileSubtitle.textContent;
  }

  //добавляется картинка
  if (eventTarget.classList.contains("profile__add-button")) {
    popupAdd.classList.toggle("popup_opened");
    urlImage.value = ""; //устанавливаем значения
    nameImage.value = "";
  }

  if (eventTarget.classList.contains("popup__container_edit"))
    popupEdit.classList.toggle("popup_opened");

  if (eventTarget.classList.contains("popup__container_add"))
    popupAdd.classList.toggle("popup_opened");

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
    const card = createCard(urlImage.value, nameImage.value);
    renderCard(cardList, card);
  }

  //после сохранения закрываем popup
  displayPopupItem(evt);
}



//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", displayPopupItem);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", displayPopupItem);

//отслеживание отправки данных профиля
popupContainerEdit.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна профиля
popupContainerEdit.addEventListener("reset", displayPopupItem);

//отслеживание отправки данных картинки
popupContainerAdd.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна картинки
popupContainerAdd.addEventListener("reset", displayPopupItem);

