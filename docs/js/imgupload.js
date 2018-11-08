'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
  var SUCCESS_STATE = 2;

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var adForm = document.querySelector('.ad-form');

  var formHeader = adForm.querySelector('.ad-form-header__upload');
  var formAvatar = formHeader.querySelector('#avatar');
  var headerImg = formHeader.querySelector('img');

  var formImg = adForm.querySelector('.ad-form__photo-container');
  var images = formImg.querySelector('#images');
  var originalAvatar = 'img/muffin-grey.svg';
  var cardFragment = document.createDocumentFragment();

  var makeMatch = function (name) {
    return FILE_TYPES.some(function (type) {
      return name.endsWith(type);
    });
  };

  var render = function (file, fileReaderHandler) {
    var fileName = file.name.toLowerCase();

    if (makeMatch(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', fileReaderHandler);

      reader.readAsDataURL(file);

      if (reader.readyState === SUCCESS_STATE) {
        reader.removeEventListener('load', fileReaderHandler);
      }
    }
  };

  var createPreview = function (file) {
    var preview = document.createElement('div');
    var pic = new Image(Preview.WIDTH, Preview.HEIGHT);

    pic.src = file;

    preview.classList.add('ad-form__photo');
    preview.draggable = true;

    preview.appendChild(pic);

    return preview;
  };

  var showAvatar = function (evt) {
    headerImg.src = evt.currentTarget.result;
  };

  var showImages = function (evt) {
    var file = evt.currentTarget.result;
    var card = createPreview(file);

    card.id = 'draggable-' + evt.loaded;

    card.addEventListener('dragstart', dragStartHandler);
    cardFragment.appendChild(card);
    formImg.appendChild(cardFragment);

  };

  var avatarLoadHandler = function () {
    var file = formAvatar.files[0];

    render(file, showAvatar);
  };

  var imagesLoadHandler = function () {
    var files = Array.from(images.files);

    images.multiple = true;

    files.forEach(function (file) {
      render(file, showImages);
    });
  };

  var setActived = function () {

    images.multiple = true;

    formAvatar.addEventListener('change', avatarLoadHandler);
    images.addEventListener('change', imagesLoadHandler);
  };

  var setDisabled = function () {
    formAvatar.removeEventListener('change', avatarLoadHandler);
    images.removeEventListener('change', imagesLoadHandler);
    headerImg.src = originalAvatar;
    document.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.parentNode.removeChild(photo);
    });
  };

  var dragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var dropHandler = function (evt) {
    var dragged = evt.dataTransfer.getData('id', evt.currentTarget.id);

    evt.preventDefault();

    formImg.appendChild(document.querySelector('#' + dragged));
    formImg.removeEventListener('dragover', dragOverHandler);

    evt.currentTarget.removeEventListener('drop', dropHandler);
  };

  var dragStartHandler = function (evt) {
    evt.dataTransfer.setData('id', evt.currentTarget.id);

    formImg.addEventListener('dragover', dragOverHandler);
    formImg.addEventListener('drop', dropHandler);
  };

  window.imgupload = {
    setActived: setActived,
    setDisabled: setDisabled,
    cardFragment: cardFragment
  };
})();
