'use strict';
(function () {
// функция добовления данных массив
  var generateAdverts = function () {
    var adverts = [];
    for (var i = 0; i < window.data.ADS_NUMBER; i++) {
      adverts.push(window.data.addAdvertInfo(i));
    }
    return adverts;
  };

  var ads = generateAdverts();

  // Функция добовления пина
  var createPinElement = function (pin) {
    var thePin = window.data.mapPinTemplate.cloneNode(true);
    var srcPin = pin.author.avatar;
    var altPin = pin.offer.title;
    thePin.querySelector('img').src = srcPin;
    thePin.querySelector('img').alt = altPin;
    thePin.style.left = pin.locations.x + 'px';
    thePin.style.top = pin.locations.y + 'px';
    return thePin;
  };

  var renderPins = function () {
    window.cards.createCardElement(ads[window.utilities.getRandomNumber(0, ads.length)]);
    for (var cards = 0; cards < window.data.ADS_NUMBER; cards++) {
      var pidData = createPinElement(ads[cards]);
      window.data.mapPinBase.appendChild(pidData);
    }
  };

  window.pin = {
    renderPins: renderPins,
    createPinElement: createPinElement
  };
})();
