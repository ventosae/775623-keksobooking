'use strict';

(function () {
  window.utilities = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (elements) {
      var max = elements .length;
      var min = 0;
      return elements [window.utilities.getRandomNumber(min, max)];
    },
    shuffleArray: function (data) {
      for (var i = data.length - 1; i > 0; i--) {
        var randomNumber = window.utilities.getRandomNumber(0, i);
        var randomElement = data[randomNumber];
        data[randomNumber] = data[i];
        data[i] = randomElement;
      }
      return data;
    }
  };
})();
