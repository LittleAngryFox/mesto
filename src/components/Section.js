export default class Section {
  //data - массив данных, которые нужно добавить на страницу,
  //renderer - функция по созданию и отрисовки данных на странице,
  //containerSelector - селектор контейнера, в который нужно добавить элементы.
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //отрисовка элементов при помощи renderer
  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  //добавление DOM-элемента в контейнер
  addItem(element, place) {
    switch (place) {
      case "append": {
        this._container.append(element);
        break;
      }
      case "prepend": {
        this._container.prepend(element);
        break;
      }
    }
  }

}
