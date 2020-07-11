let content = document.querySelector(".content");
let popup = content.querySelector(".popup");

let profileInfo = content.querySelector(".profile__info"); //Информация о имени и сфере деятельности
let profileTitle = profileInfo.querySelector(".profile__title");
let profileSubtitle = profileInfo.querySelector(".profile__subtitle");

let editButton = profileInfo.querySelector(".profile__edit-button"); //кнопка редактирования

let popupContainer =  content.querySelector(".popup__container"); //форма редактирования

let nameInput = popup.querySelector("#heading");
let jobInput = popup.querySelector("#subheading");

//открытие popup
function profileInfoEditOpened() {
  popup.classList.add("popup_opened"); //делает popup видимым

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//закрытие popup
function profileInfoEditClosed() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  //после сохранения закрываем popup
  profileInfoEditClosed();
}


//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", profileInfoEditOpened);
//отслеживание отправки данных
popupContainer.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна
popupContainer.addEventListener("reset", profileInfoEditClosed);
