'use strict';

(function () {
  var SPIKEHEIGHT = 20;
  var ADS_NUMBER = 5;
  var LOCATIONS = {
    x: {
      min: 0,
      max: document.querySelector('.map').offsetWidth
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var TYPES_RU = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var FLATS_MIN_PRICES = [0, 1000, 5000, 10000];
  var PIN_GAP_Y = document.querySelector('.map__pin--main').offsetHeight + SPIKEHEIGHT;
  var PIN_GAP_X = Math.floor(document.querySelector('.map__pin--main').offsetWidth / 2);
  var MAIN_PIN_BASE_Y = 570;
  var MAIN_PIN_BASE_X = 375;
  var MAIN_PIN_BASE_Y_VALUE = 450;
  var MAIN_PIN_BASE_X_VALUE = 600;
  var ESC_KEY = 27;
  var SPACE_KEY = 32;
  var ENTER_KEY = 13;
  var SELECTION_VALUE = 1;

  window.data = {
    ADS_NUMBER: ADS_NUMBER,
    TYPES_RU: TYPES_RU,
    LOCATIONS: LOCATIONS,
    PIN_GAP_Y: PIN_GAP_Y,
    PIN_GAP_X: PIN_GAP_X,
    FLATS_MIN_PRICES: FLATS_MIN_PRICES,
    MAIN_PIN_BASE_Y: MAIN_PIN_BASE_Y,
    MAIN_PIN_BASE_X: MAIN_PIN_BASE_X,
    ESC_KEY: ESC_KEY,
    MAIN_PIN_BASE_Y_VALUE: MAIN_PIN_BASE_Y_VALUE,
    MAIN_PIN_BASE_X_VALUE: MAIN_PIN_BASE_X_VALUE,
    SPACE_KEY: SPACE_KEY,
    ENTER_KEY: ENTER_KEY,
    SELECTION_VALUE: SELECTION_VALUE
  };
})();
