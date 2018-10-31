'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var form = document.querySelector('.ad-form');

  var formHeader = form.querySelector('.ad-form-header__upload');
  var avatar = formHeader.querySelector('#avatar');
  var headerImg = formHeader.querySelector('img');

  var formImg = form.querySelector('.ad-form__photo-container');
  var images = formImg.querySelector('#images');
  var originalAvatar = 'img/muffin-grey.svg';
  var cardFragment = document.createDocumentFragment();

  var makeMatch = function (name) {
    return FILE_TYPES.some(function (type) {
      return name.endsWith(type);
    });
  };

  var render = function (file, fileReaderCB) {
    var fileName = file.name.toLowerCase();

    if (makeMatch(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', fileReaderCB);

      reader.readAsDataURL(file);

      if (reader.readyState === 2) {
        reader.removeEventListener('load', fileReaderCB);
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

    card.addEventListener('dragstart', onDragStart);
    cardFragment.appendChild(card);
    formImg.appendChild(cardFragment);

  };

  var onAvatarLoad = function () {
    var file = avatar.files[0];

    render(file, showAvatar);
  };

  var onImagesLoad = function () {
    var files = Array.from(images.files);

    images.multiple = true;

    files.forEach(function (file) {
      render(file, showImages);
    });
  };

  var setActived = function () {

    images.multiple = true;

    avatar.addEventListener('change', onAvatarLoad);
    images.addEventListener('change', onImagesLoad);
  };

  var setDisabled = function () {
    avatar.removeEventListener('change', onAvatarLoad);
    images.removeEventListener('change', onImagesLoad);
    headerImg.src = originalAvatar;
    document.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.parentNode.removeChild(photo);
    });
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDrop = function (evt) {
    var dragged = evt.dataTransfer.getData('id', evt.currentTarget.id);

    evt.preventDefault();

    formImg.appendChild(document.querySelector('#' + dragged));
    formImg.removeEventListener('dragover', onDragOver);

    evt.currentTarget.removeEventListener('drop', onDrop);
  };

  var onDragStart = function (evt) {
    evt.dataTransfer.setData('id', evt.currentTarget.id);

    formImg.addEventListener('dragover', onDragOver);
    formImg.addEventListener('drop', onDrop);
  };

  window.imgupload = {
    setActived: setActived,
    setDisabled: setDisabled,
    cardFragment: cardFragment
  };
})();
