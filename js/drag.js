'use strict';
(function () {

  var mainPinMain = document.querySelector('.map__pin--main');

  mainPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      if (pinPositionY >= window.data.LOCATIONS.y.min && pinPositionY + window.data.PIN_GAP_Y <= window.data.LOCATIONS.y.max) {
        mainPinMain.style.top = pinPositionY + 'px';
      }

      if (pinPositionX <= window.data.LOCATIONS.x.max && pinPositionX + window.data.PIN_GAP_X * 2 >= window.data.LOCATIONS.x.min) {
        mainPinMain.style.left = pinPositionX + 'px';
      }

      window.data.ADDRESS_INPUT.value = (pinPositionY + window.data.PIN_GAP_Y) + ', ' + (pinPositionX + window.data.PIN_GAP_X);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.form.enableAll();
    window.pin.renderPins();
  });
})();
