'use strict';

(function () {
  var DEFAULT_FILTER = 'any';
  var filterMain = document.querySelector('.map__filters');
  var housingType = filterMain.querySelector('#housing-type');
  var housingPrice = filterMain.querySelector('#housing-price');
  var housingRooms = filterMain.querySelector('#housing-rooms');
  var housingGuests = filterMain.querySelector('#housing-guests');

  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var filterType = function (pin) {
    return housingType.value === DEFAULT_FILTER ? true
      : pin.offer.type === housingType.value;
  };

  var filterPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < Price.LOW;
      case 'middle':
        return pin.offer.price >= Price.LOW && pin.offer.price < Price.MIDDLE;
      case 'high':
        return pin.offer.price >= Price.MIDDLE;
      default:
        return true;
    }
  };

  var filterRoom = function (pin) {
    return housingRooms.value === DEFAULT_FILTER ? true
      : pin.offer.rooms === +housingRooms.value;
  };

  var filterGuest = function (pin) {
    return housingGuests.value === DEFAULT_FILTER ? true
      : pin.offer.guests === +housingGuests.value;
  };

  var filterFeature = function (pin) {
    var features = Array.from(filterMain.querySelectorAll('.map__checkbox:checked'));

    return features.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var filterAll = function (items) {
    return items
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterFeature);
  };

  window.filter = {
    filterAll: filterAll,
  };

})();
