export default class UserInfo {
  //селектор двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({ selectorUserName, selectoruserDescription }) {
    this._userName = document.querySelector(selectorUserName);
    this._userDescription = document.querySelector(selectoruserDescription);
  }

  getUserInfo() {
    return { name: this._userName.textContent, description: this._userDescription.textContent };
  }

  setUserInfo({ heading, subheading }) {
    this._userName.textContent = heading;
    this._userDescription.textContent = subheading;
  }

}
