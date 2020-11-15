export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка начальных карточек
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //загрузка информации о пользователе
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //изменение инфомарции пользователя
  patchUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //обновление аватара пользователя
  patchUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //отправка карточки
  postCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //удаление карточки пользователя
  deleteMyCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //активация кнопки лайка
  activeLike(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  //деактивация кнопки лайка
  deleteLike(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

}

