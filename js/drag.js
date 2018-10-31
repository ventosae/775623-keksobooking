'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');
  var mainPinMain = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('[name="address"]');

  mainPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (mainPinMain.classList.value !== 'map__pin map__pin--main map__pin--activated') {
      mainPinMain.classList.add('map__pin--activated');
      window.pin.uploadPins();
      window.form.enableAll();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPositionY = mainPinMain.offsetTop - shift.y;
      var pinPositionX = mainPinMain.offsetLeft - shift.x;

      if (pinPositionY + window.data.PIN_GAP_Y >= window.data.LOCATIONS.y.min + window.data.PIN_GAP_Y && pinPositionY <= window.data.LOCATIONS.y.max) {
        mainPinMain.style.top = pinPositionY + 'px';
      }

      if (pinPositionX + window.data.PIN_GAP_X * 2 <= window.data.LOCATIONS.x.max && pinPositionX >= window.data.LOCATIONS.x.min) {
        mainPinMain.style.left = pinPositionX + 'px';
      }

      addressInput.value = (pinPositionY + window.data.PIN_GAP_Y) + ', ' + (pinPositionX + window.data.PIN_GAP_X);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousedown', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
