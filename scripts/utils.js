//открытие/закрытие popup окон
const openPopup = (popupForm) => {
  popupForm.classList.add("popup_opened");
  //закрытие через esc
  document.addEventListener("keydown", keyEsc);
  //закрытие по нажатию на оверлей
  document.addEventListener("mousedown", closeOverlayPopup);
};

const closePopup = (popupForm) => {
  popupForm.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyEsc);
  document.removeEventListener("mousedown", closeOverlayPopup);
};

//закрытие по клавише esc
const keyEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//закрытие по нажатию на overlay
const closeOverlayPopup = (evt) => {
  if (evt.target.classList.contains("popup")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export {openPopup, closePopup};
