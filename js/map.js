var mapData = {
  "author": {
      avatar: [],
      generateAvatars: function() {
          for (var i = 0; i < AVATARS_NUMBER; i++) {
              mapData.author.avatar.push('img/avatars/user0' + 'i' + '.png')
          }
      }
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
        max: map.offsetWidth
      },
      y: {
        min: 130,
        max: 630
      }
    }
  };

// Пишем рандомизатор
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
