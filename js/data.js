'use strict';

(function () {
  var SPIKEHEIGHT = 10;
  var ADS_NUMBER = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PRICES = {
    min: 1000,
    max: 1000000
  };
  var ROOMS = {
    min: 1,
    max: 5
  };
  var GUESTS = {
    min: 1,
    max: 3
  };
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
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var TYPES_RU = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var FLATS_MIN_PRICES = [0, 1000, 5000, 10000];

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinBase = document.querySelector('.map__pins');
  var mainPin = mapPinBase.querySelector('.map__pin');
  var PIN_GAP_Y = mainPin.offsetHeight + SPIKEHEIGHT;
  var PIN_GAP_X = Math.floor(mainPin.offsetWidth / 2);

  var addAdvertInfo = function (num) {
    var adData = {
      author: {
        avatar: 'img/avatars/user0' + (num + 1) + '.png'
      },
      offer: {
        title: TITLES[num],
        address: '',
        price: window.utilities.getRandomNumber(PRICES.min, PRICES.max),
        type: TYPES[window.utilities.getRandomNumber(0, TYPES.length)],
        rooms: window.utilities.getRandomNumber(ROOMS.min, ROOMS.max),
        guests: window.utilities.getRandomNumber(GUESTS.min, GUESTS.max),
        checkin: window.utilities.getRandomElement(CHECKIN),
        checkout: window.utilities.getRandomElement(CHECKOUT),
        features: FEATURES.slice(0, window.utilities.getRandomNumber(1, FEATURES.length)),
        description: '',
        photos: window.utilities.shuffleArray(PHOTOS)
      },
      locations: {
        x: mapPinTemplate.offsetWidth + window.utilities.getRandomNumber(LOCATIONS.x.min, LOCATIONS.x.max),
        y: mapPinTemplate.offsetHeight + window.utilities.getRandomNumber(LOCATIONS.y.min, LOCATIONS.y.max)
      }
    };
    adData.offer.address = adData.locations.x + ', ' + adData.locations.y;
    return adData;
  };

  window.data = {
    addAdvertInfo: addAdvertInfo,
    ADS_NUMBER: ADS_NUMBER,
    TYPES_RU: TYPES_RU,
    LOCATIONS: LOCATIONS,
    PIN_GAP_Y: PIN_GAP_Y,
    PIN_GAP_X: PIN_GAP_X,
    FLATS_MIN_PRICES: FLATS_MIN_PRICES
  };
})();
