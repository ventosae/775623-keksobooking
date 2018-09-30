'use strict';

var AVATARS_NUMBERS = 8;
var CARDS_NUMBER = 8;
document.querySelector('.map').classList.remove('map--faded');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinBase = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var templateFeatures = cardTemplate.querySelector('.popup__features');
var cardFragment = document.createDocumentFragment();
var cardBase = document.querySelector('.map__pins');
var photoBase = cardTemplate.querySelector('.popup__photos');
var fullMap = document.querySelector('.map');
var featuresFragment = document.createDocumentFragment();
var photoFragment = document.createDocumentFragment();
var adInfo = [];

var AVATARS = [];
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
    max: fullMap.offsetWidth
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
function shuffleArray(list) {
  for (var i = list.length - 1; i > 0; i--) {
    var randomNumber = getRandomNumber(0, i);
    var randomElement = list[randomNumber];
    list[randomNumber] = list[i];
    list[i] = randomElement;
  }
  return list;
}

// Генерируем аватары в массив
var generateAvatars = function () {
  for (var i = 1; i < AVATARS_NUMBERS; i++) {
    AVATARS.push('img/avatars/user0' + i + '.png');
  }
};
generateAvatars();

// Функция создания данных для массива
var addAdInfo = function () {
  var adData = {
    'author': {
      'avatar': getRandomElement(AVATARS)
    },
    'offer': {
      'title': getRandomElement(TITLES),
      'price': getRandomNumber(PRICES.min, PRICES.max),
      'type': TYPES[getRandomNumber(0, TYPES.length)],
      'rooms': getRandomNumber(ROOMS.min, ROOMS.max),
      'guests': getRandomNumber(GUESTS.min, GUESTS.max),
      'checkin': getRandomElement(CHECKIN),
      'checkout': getRandomElement(CHECKOUT),
      'features': FEATURES.slice(0, getRandomNumber(1, FEATURES.length)),
      'description': '',
      'photos': shuffleArray(PHOTOS)
    },
    'locations': {
      x: mapPinTemplate.offsetWidth + getRandomNumber(LOCATIONS.x.min, LOCATIONS.x.max),
      y: mapPinTemplate.offsetWidth + getRandomNumber(LOCATIONS.y.min, LOCATIONS.y.max)
    }
  };
  return adData;
};

// функция добовления данных массив
var addToArray = function (array) {
  for (var i = 0; i < CARDS_NUMBER; i++) {
    array.push(addAdInfo());
  }
};

addToArray(adInfo);

var addPhoto = function (photosArray) {
  for (var i = 0; i < photosArray.length; i++) {
    var photoElement = photoBase.querySelector('img').cloneNode(true);
    photoElement.src = photosArray[i];
    photoFragment.appendChild(photoElement);
  }
  photoBase.innerHTML = '';
  photoBase.appendChild(photoFragment);
};

// Функция добовления пина
var addPin = function (pin) {
  var thePin = mapPinTemplate.cloneNode(true);
  var srcPin = pin.author.avatar;
  var altPin = pin.offer.title;
  thePin.querySelector('img').src = srcPin;
  thePin.querySelector('img').alt = altPin;
  thePin.style.left = mapPinTemplate.offsetWidth + pin.locations.x + 'px';
  thePin.style.top = mapPinTemplate.offsetWidth + pin.locations.y + 'px';
  fragment.appendChild(thePin);
  mapPinBase.appendChild(fragment);
};

var addFeatures = function (randomFeatures) {
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
  templateFeatures.appendChild(featuresFragment);
};

var addCard = function (card) {
  addFeatures(card.offer.features);
  addPhoto(card.offer.photos);
  var advertCard = cardTemplate.cloneNode(true);
  advertCard.querySelector('.popup__title').textContent = card.offer.title;
  advertCard.querySelector('.popup__text--address').textContent = card.locations.x + ', ' + card.locations.y;
  advertCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  advertCard.querySelector('.popup__type').textContent = TYPES_RU[card.offer.type].type;
  advertCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  advertCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  advertCard.querySelector('.popup__description').textContent = card.offer.description;
  advertCard.querySelector('.popup__avatar').src = card.author.avatar;
  cardFragment.appendChild(advertCard);
  cardBase.appendChild(cardFragment);
};

var renderElements = function () {
  addCard(adInfo[getRandomNumber(0, adInfo.length)]);
  for (var cards = 0; cards < CARDS_NUMBER; cards++) {
    addPin(adInfo[cards]);
  }
};

renderElements();
