export default class UserInfo {
  //селектор двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({ selectorUserName, selectorUserDescription, selectorAvatar }) {
    this._userName = document.querySelector(selectorUserName);
    this._userDescription = document.querySelector(selectorUserDescription);
    this._userAvatar = document.querySelector(selectorAvatar);

  }

  getUserInfo() {
    return { name: this._userName.textContent, description: this._userDescription.textContent };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }

  renderUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
    this._myId = _id;
  }

  getmyId() {
    return this._myId;
  }
}
