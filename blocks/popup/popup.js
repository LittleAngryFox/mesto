let content = document.querySelector(".content");
let popup = content.querySelector(".popup");

let profile__info = content.querySelector(".profile__info"); //Информация о имени и сфере деятельности
let profile__title = profile__info.querySelector(".profile__title");
let profile__subtitle = profile__info.querySelector(".profile__subtitle");

let editButton = profile__info.querySelector(".profile__editButton"); //кнопка редактирования

let popup__container =  content.querySelector(".popup__container"); //форма редактирования

//открытие popup
function profileInfoEditOpened() {
  popup.classList.add("popup_opened"); //делает popup видимым

  let heading_start = popup.querySelector("#heading"); //вставляем в форму "начальные" значения при открытии
  let subheading_start = popup.querySelector("#subheading");
  heading_start.setAttribute("value", profile__title.textContent);
  subheading_start.setAttribute("value", profile__subtitle.textContent);
}

//закрытие popup
function profileInfoEditClosed() {
  popup.classList.remove("popup_opened");
}

//отслеживание нажатия на кнопку редактирования
editButton.addEventListener("click", profileInfoEditOpened);


function formSubmitHandler (evt) {
  evt.preventDefault();

  //получаем новые значения
  let nameInput = popup.querySelector("#heading");
  let jobInput = popup.querySelector("#subheading");

  profile__title.textContent = nameInput.value;
  profile__subtitle.textContent = jobInput.value;

  //после сохранения закрываем popup
  profileInfoEditClosed();
}

//отслеживание отправки данных
popup__container.addEventListener("submit", formSubmitHandler);
//отслеживание закрытия окна
popup__container.addEventListener("reset", profileInfoEditClosed);
