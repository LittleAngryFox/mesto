const content = document.querySelector(".content");

const popupEdit = content.querySelector(".popup_edit-profile"); //блок редактирования профиля
const popupAdd = content.querySelector(".popup_add"); //блок добавления катинки
const popupImg = content.querySelector(".popup_image"); //блок добавления увеличенной катинки

const profile = content.querySelector(".profile");//Информация о имени и сфере деятельности
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupImgItem = popupImg.querySelector(".popup__img-item"); //Информация о картинке
const popupCaption = popupImg.querySelector(".popup__caption");

const editButton = profile.querySelector(".profile__edit-button"); //кнопка редактирования
const addButton = profile.querySelector(".profile__add-button"); //кнопка добавления

const popupContainerEdit = content.querySelector(".popup__container_edit"); //форма редактирования
const popupContainerAdd = content.querySelector(".popup__container_add"); //форма редактирования

const nameInput = popupEdit.querySelector(".popup__item_heading"); //Инпуты
const jobInput = popupEdit.querySelector(".popup__item_subheading");
const nameImage = popupAdd.querySelector(".popup__item_picture");
const urlImage = popupAdd.querySelector(".popup__item_imgurl");
const cardTemplate = document.querySelector(".card__template").content; //Шаблон места под картинку
const cardList = document.querySelector(".elements__list");

//открытие/закрытие popup окон
function openPopup(popupForm) {
  popupForm.classList.add("popup_opened");
}

function closePopup(popupForm) {
  popupForm.classList.remove("popup_opened");
}

function createProfileContent(evt) {
  evt.preventDefault();
  nameInput.value = profileTitle.textContent; //устанавливаем значения
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
}

function createAddContent(evt) {
  evt.preventDefault();
  urlImage.value = ""; //устанавливаем значения
  nameImage.value = "";
  openPopup(popupAdd);
}

function createImagePopup(evt) {
  evt.preventDefault();
  popupImgItem.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImgItem.alt = evt.target.alt;
  openPopup(popupImg);
}

//открытие увеличенной картинки
function showImagePopup(evt) {
  createImagePopup(evt);
  const exitImg = popupImg.querySelector(".popup__close-button_img");
  exitImg.addEventListener("click", () => { closePopup(popupImg) });
}

function activateLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function removeCard(evt) {
  evt.target.closest(".elements__item").remove();
}

//Заполнение шаблона картинки в галерее
function createCard(itemLink, itemName) {
  //копия шаблона
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".element__img");
  cardImg.src = itemLink;
  card.querySelector(".element__title").textContent = itemName;
  cardImg.alt = itemName;
  card.querySelector(".element__like-button").addEventListener("click", activateLikeButton)
  card.querySelector(".element__remove").addEventListener("click", removeCard);
  cardImg.addEventListener("click", showImagePopup);
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
}

//отслеживание отправки информации от пользователя
function formSubmitHandler(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  //редактируется профиль
  if (eventTarget.classList.contains("popup__container_edit")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
  }
  //добавляется картинка
  if (eventTarget.classList.contains("popup__container_add")) {
    const card = createCard(urlImage.value, nameImage.value);
    renderCard(cardList, card);
    closePopup(popupAdd);
  }
}

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", createProfileContent);
//отслеживание нажатия на кнопку добавления картинки
addButton.addEventListener("click", createAddContent);
//отслеживание отправки данных профиля
popupContainerEdit.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна профиля
popupContainerEdit.addEventListener("reset", () => { closePopup(popupEdit) });
//отслеживание отправки данных картинки
popupContainerAdd.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна картинки
popupContainerAdd.addEventListener("reset", () => { closePopup(popupAdd) });
