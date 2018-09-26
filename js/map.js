   'use strict';
AVATARS_NUMBER = 8;

var fullMap = document.querySelector('.map');

  var mapData = {
    "author": {
        avatar: [],
    },
    titles: [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'
      ],
      price: {
        min: 1000,
        max: 1000000
      },
      types: [
        'palace',
        'flat',
        'house',
        'bungalo'
      ],
      rooms: {
        min: 1,
        max: 5
      },
      guests: {
        min: 1,
        max: 3
      },
      checkin: [
        '12:00',
        '13:00',
        '14:00'
      ],
      checkout: [
        '12:00',
        '13:00',
        '14:00'
      ],
      features: [
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner'
      ],
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],
      locations: {
        x: {
          min: 0,
          max: fullMap.offsetWidth
        },
        y: {
          min: 130,
          max: 630
        }
      }
    };

    var TYPES = {
      flat: {
        translation: 'Квартира'
      },
      bungalo: {
        translation: 'Бунгало'
      },
      house: {
        translation: 'Дом'
      },
      palace: {
        translation: 'Дворец'
      }
    };




    var generateAvatars = function() {
      for (var i = 1; i < AVATARS_NUMBER; i++) {
          mapData.author.avatar.push('img/avatars/user0' + i + '.png')
      }
  }
  generateAvatars()

// Пишем рандомизатор
  var getRandomElement = function (arrayName) {
    return arrayName[Math.floor(Math.random() * (arrayName.length))];
  };

// Get random number
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  function shuffleArray(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var randomNumber = Math.floor(Math.random() * (i + 1));
      var randomElement = list[randomNumber];
      list[randomNumber] = list[i];
      list[i] = randomElement;
    }
    return list;
  }

document.querySelector('.map').classList.remove('map--faded');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinBase = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var templateFeatures = cardTemplate.querySelector('.popup__features');
var cardFragment = document.createDocumentFragment();
var cardBase = document.querySelector('.map__pins');
var photoBase = cardTemplate.querySelector('.popup__photos');

var addPhoto = function (photosArray) {
  var photoFragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    var photoElement = photoBase.querySelector('img').cloneNode(true);
    photoElement.src = photosArray[i];
    photoFragment.appendChild(photoElement);
  }
  photoBase.innerHTML = '';
  photoBase.appendChild(photoFragment);
};


var addPin = function() {
  var thePin = mapPinTemplate.cloneNode(true);
  var randomX = mapPinTemplate.offsetWidth + getRandomNumber(mapData.locations.x.min, mapData.locations.x.max);
  var randomY = mapPinTemplate.offsetWidth + getRandomNumber(mapData.locations.y.min, mapData.locations.y.max);
  var srcPin = getRandomElement(mapData.author.avatar);
  var altPin = getRandomElement(mapData.titles);
  thePin.querySelector('img').src = srcPin;
  thePin.querySelector('img').alt = altPin;
  thePin.style.left =  randomX + 'px';
  thePin.style.top = randomY + 'px';
  fragment.appendChild(thePin);
  mapPinBase.appendChild(fragment)
};

var addCard = function() {
  var theCard = cardTemplate.cloneNode(true);
  var randomX = mapPinTemplate.offsetWidth + getRandomNumber(mapData.locations.x.min, mapData.locations.x.max);
  var randomY = mapPinTemplate.offsetWidth + getRandomNumber(mapData.locations.y.min, mapData.locations.y.max);
  var getRandomType = mapData.types[getRandomNumber(0, mapData.types.length)];
  var randomFeatures = mapData.features.slice(0, getRandomNumber(1, mapData.features.length));
  var randomPhotohs = shuffleArray(mapData.photos);
  theCard.querySelector('.popup__title').textContent = getRandomElement(mapData.titles);
  theCard.querySelector('.popup__text--address').textContent = randomX + ', ' + randomY;
  theCard.querySelector('.popup__text--price').textContent = getRandomNumber(mapData.price.min, mapData.price.max)  + '₽/ночь';
  theCard.querySelector('.popup__type').textContent = TYPES[getRandomType].translation;
  theCard.querySelector('.popup__text--capacity').textContent = getRandomNumber(mapData.rooms.min, mapData.rooms.max) + ' комнаты для ' + getRandomNumber(mapData.guests.min, mapData.guests.max) + ' гостей';
  theCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + getRandomElement(mapData.checkin) + ', выезд до ' + getRandomElement(mapData.checkout);

  var addFeatures = function () {
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
    templateFeatures.appendChild(featuresFragment);
  };

  addFeatures(theCard.templateFeatures);

  theCard.querySelector('.popup__description').textContent = "";
  // theCard.querySelector('.popup__photo').src = getRandomElement(mapData.photos);

  addPhoto(randomPhotohs)

  theCard.querySelector('.popup__avatar').src = getRandomElement(mapData.author.avatar);
  cardFragment.appendChild(theCard);
  cardBase.appendChild(cardFragment);
};
