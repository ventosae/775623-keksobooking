'use strict';
(function () {
// функция добовления данных массив
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinBase = document.querySelector('.map__pins');

  // Функция добовления пина
  var createPinElement = function (pin) {
    var thePin = mapPinTemplate.cloneNode(true);
    var srcPin = pin.author.avatar;
    var altPin = pin.offer.title;
    thePin.querySelector('img').src = srcPin;
    thePin.querySelector('img').alt = altPin;
    thePin.style.left = pin.location.x + 'px';
    thePin.style.top = pin.location.y + 'px';
    return thePin;
  };

  var renderPins = function (data) {
    // window.cards.createCardElement(ads[window.utilities.getRandomNumber(0, ads.length)]);
    for (var cards = 0; cards < window.data.ADS_NUMBER; cards++) {
      var pidData = createPinElement(data[cards]);
      mapPinBase.appendChild(pidData);
    }
  };

  var uploadPins = function () {
    window.backend.load(renderPins, window.backend.onErrorResponse);
  };

  window.pin = {
    uploadPins: uploadPins
  };
})();
