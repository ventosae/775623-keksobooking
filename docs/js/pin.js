'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinBase = document.querySelector('.map__pins');
  var pinsData = [];
  var filterMain = document.querySelector('.map__filters');

  var createPinElement = function (pin) {
    var thePin = mapPinTemplate.cloneNode(true);
    var pinImg = thePin.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    thePin.style.left = pin.location.x + 'px';
    thePin.style.top = pin.location.y + 'px';
    thePin.addEventListener('click', setPinActiveHandler);
    return thePin;
  };

  var getPinsData = function () {
    return pinsData;
  };

  var loadPins = function (data) {
    pinsData = data;
    var mapFiltersForms = Array.from(filterMain.children);
    mapFiltersForms.forEach(function (elem) {
      elem.disabled = false;
    });
    pinsData.forEach(function (pin, i) {
      pin.id = i;
    });
    renderPins(data);
  };

  var setPinActiveHandler = function (pin) {
    var allVisiblePins = Array.from(mapPinBase.querySelectorAll('[type=button]'));
    allVisiblePins.forEach(function (elemet) {
      elemet.classList.remove('map__pin--active');
    });
    window.cards.removeCard();
    pin.currentTarget.classList.add('map__pin--active');
    var activePin = pin.currentTarget.id;
    window.cards.addCard(pinsData[activePin]);
  };

  var renderPins = function (data) {
    data.slice(0, window.data.ADS_NUMBER).forEach(function (pin) {
      var pinElement = createPinElement(pin);
      pinElement.id = pin.id;
      mapPinBase.appendChild(pinElement);
    });
  };

  var uploadPins = function () {
    window.backend.load(loadPins, window.form.errorResponseHandler);
  };

  window.pin = {
    uploadPins: uploadPins,
    getPinsData: getPinsData,
    renderPins: renderPins,
  };
})();
