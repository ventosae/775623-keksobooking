'use strict';
(function () {
// функция добовления данных массив
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinBase = document.querySelector('.map__pins');
  var pinsData = [];
  var activePin;

  // Функция добовления пина
  var createPinElement = function (pin) {
    var thePin = mapPinTemplate.cloneNode(true);
    var srcPin = pin.author.avatar;
    var altPin = pin.offer.title;
    thePin.querySelector('img').src = srcPin;
    thePin.querySelector('img').alt = altPin;
    thePin.style.left = pin.location.x + 'px';
    thePin.style.top = pin.location.y + 'px';
    thePin.addEventListener('click', setPinActive);
    return thePin;
  };

  var getPinsData = function () {
    return pinsData;
  };

  var loadPins = function (data) {
    pinsData = data;
    pinsData.forEach(function (pin, i) {
      pin.id = i;
    });
    renderPins(data);
  };

  var setPinActive = function (pin) {
    if (activePin) {
      document.getElementById(activePin).classList.remove('map__pin--active');
      window.cards.removeCard();
    }
    pin.currentTarget.classList.add('map__pin--active');
    activePin = pin.currentTarget.id;
    window.cards.addCard(pinsData[activePin]);
  };

  var clearActivePin = function () {
    activePin = null;
  };

  var renderPins = function (data) {
    data.slice(0, window.data.ADS_NUMBER).forEach(function (pin) {
      var pinElement = createPinElement(pin);
      pinElement.id = pin.id;
      mapPinBase.appendChild(pinElement);
    });
  };

  var uploadPins = function () {
    window.backend.load(loadPins, window.form .onErrorResponse);
  };

  window.pin = {
    uploadPins: uploadPins,
    getPinsData: getPinsData,
    renderPins: renderPins,
    clearActivePin: clearActivePin
  };
})();
