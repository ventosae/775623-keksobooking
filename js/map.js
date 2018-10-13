'use strict';

var SPIKE_HEIGHT = 10;
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

// Перевод типов квартир
var TYPES_RU = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var FLATS_MIN_PRICES = [0, 1000, 5000, 10000];

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinBase = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var templateFeatures = cardTemplate.querySelector('.popup__features');
var photosTemplate = cardTemplate.querySelector('.popup__photos');
var fullMap = document.querySelector('.map');
var allFieldsets = document.querySelectorAll('fieldset');
var allSelects = document.querySelectorAll('select');
var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');
var mainPin = mapPinBase.querySelector('.map__pin');
var addressInput = adForm.querySelector('[name="address"]');
var pinGapY = mainPin.offsetHeight + SPIKE_HEIGHT;
var pinGapX = Math.floor(mainPin.offsetWidth / 2);

// Пишем рандомизатор
var getRandomElement = function (elements) {
  var max = elements .length;
  var min = 0;
  return elements [getRandomNumber(min, max)];
};

// Get random number
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Shuffle любой массив
var shuffleArray = function (arraysData) {
  for (var i = arraysData.length - 1; i > 0; i--) {
    var randomNumber = getRandomNumber(0, i);
    var randomElement = arraysData[randomNumber];
    arraysData[randomNumber] = arraysData[i];
    arraysData[i] = randomElement;
  }
  return arraysData;
};

// Функция создания данных для массива
var addAdvertInfo = function (num) {
  var adData = {
    author: {
      avatar: 'img/avatars/user0' + (num + 1) + '.png'
    },
    offer: {
      title: TITLES[num],
      address: '',
      price: getRandomNumber(PRICES.min, PRICES.max),
      type: TYPES[getRandomNumber(0, TYPES.length)],
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)),
      description: '',
      photos: shuffleArray(PHOTOS)
    },
    locations: {
      x: mapPinTemplate.offsetWidth + getRandomNumber(LOCATIONS.x.min, LOCATIONS.x.max),
      y: mapPinTemplate.offsetHeight + getRandomNumber(LOCATIONS.y.min, LOCATIONS.y.max)
    }
  };
  adData.offer.address = adData.locations.x + ', ' + adData.locations.y;
  return adData;
};

// функция добовления данных массив
var generateAdverts = function () {
  var adverts = [];
  for (var i = 0; i < ADS_NUMBER; i++) {
    adverts.push(addAdvertInfo(i));
  }
  return adverts;
};

var ads = generateAdverts();

// Функция добовления пина
var createPinElement = function (pin) {
  var thePin = mapPinTemplate.cloneNode(true);
  var srcPin = pin.author.avatar;
  var altPin = pin.offer.title;
  thePin.querySelector('img').src = srcPin;
  thePin.querySelector('img').alt = altPin;
  thePin.style.left = pin.locations.x + 'px';
  thePin.style.top = pin.locations.y + 'px';
  return thePin;
};

var getPhotosFragement = function (photos) {
  var photoFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photosTemplate.querySelector('img').cloneNode(true);
    photoElement.src = photos[i];
    photoFragment.appendChild(photoElement);
  }
  photosTemplate.innerHTML = '';
  return photoFragment;
};

var getFeaturesFragment = function (randomFeatures) {
  var featuresFragment = document.createDocumentFragment();
  if (randomFeatures.length) {
    for (var i = 0; i < randomFeatures.length; i++) {
      var featuresElement = templateFeatures.querySelector('li').cloneNode(true);
      featuresElement.classList.add('popup__feature', 'popup__feature--' + randomFeatures[i]);
      featuresFragment.appendChild(featuresElement);
    }
  } else {
    templateFeatures.classList.add('hidden');
  }
  templateFeatures.innerHTML = '';
  return featuresFragment;
};

var createCardElement = function (card) {
  photosTemplate.appendChild(getPhotosFragement(card.offer.photos));
  templateFeatures.appendChild(getFeaturesFragment(card.offer.features));
  var advertCard = cardTemplate.cloneNode(true);
  advertCard.querySelector('.popup__title').textContent = card.offer.title;
  advertCard.querySelector('.popup__text--address').textContent = card.offer.address;
  advertCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  advertCard.querySelector('.popup__type').textContent = TYPES_RU[card.offer.type].type;
  advertCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  advertCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  advertCard.querySelector('.popup__description').textContent = card.offer.description;
  advertCard.querySelector('.popup__avatar').src = card.author.avatar;

  return advertCard;
};

// cards generator
// cardBase.appendChild(createCardElement(ads[getRandomNumber(0, ads.length)]));

var renderPins = function () {
  createCardElement(ads[getRandomNumber(0, ads.length)]);
  for (var cards = 0; cards < ADS_NUMBER; cards++) {
    var pidData = createPinElement(ads[cards]);
    mapPinBase.appendChild(pidData);
  }
};

var enableAll = function () {
  fullMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('.map__filters');
  allFieldsets.forEach(function (element) {
    element.disabled = false;
  });
  allSelects.forEach(function (element) {
    element.disabled = false;
  });
};

// pin dragger module

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

      if (pinPositionY >= LOCATIONS.y.min && pinPositionY + pinGapY <= LOCATIONS.y.max) {
        mainPinMain.style.top = pinPositionY + 'px';
      }

      if (pinPositionX <= LOCATIONS.x.max && pinPositionX + pinGapX * 2 >= LOCATIONS.x.min) {
        mainPinMain.style.left = pinPositionX + 'px';
      }

      addressInput.value = (pinPositionY + pinGapY) + ', ' + (pinPositionX + pinGapX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    enableAll();
    renderPins();
  });
})();

var flatTypeSelection = document.querySelector('#type');
var flatPriceInput = document.querySelector('#price');
var checkInSelection = document.querySelector('#timein');
var checkOutSelection = document.querySelector('#timeout');

var upatedFormFlatType = function () {
  var flatIndex = flatTypeSelection.selectedIndex;
  flatPriceInput.placeholder = FLATS_MIN_PRICES[flatIndex];
  flatPriceInput.min = FLATS_MIN_PRICES[flatIndex];
};

var updateCheckIn = function () {
  checkInSelection.selectedIndex = checkOutSelection.selectedIndex;
};

var updateCheckOut = function () {
  checkOutSelection.selectedIndex = checkInSelection.selectedIndex;
};

function formChangesHandler() {
  flatTypeSelection.addEventListener('change', upatedFormFlatType);
  checkOutSelection.addEventListener('change', updateCheckIn);
  checkInSelection.addEventListener('change', updateCheckOut);
}

(function () {
  fullMap.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('.map__filters');
  allFieldsets.forEach(function (element) {
    element.disabled = true;
  });
  allSelects.forEach(function (element) {
    element.disabled = true;
  });
  addressInput.value = Math.floor((parseInt(mainPin.style.left, 10) + pinGapY)) + ', ' + (parseInt(mainPin.style.top, 10) + pinGapX);
  formChangesHandler();
}());
