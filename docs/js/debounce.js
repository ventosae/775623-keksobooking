'use strict';

(function () {
  var DEBOUNCE_TIME = 500;

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun();
      }, DEBOUNCE_TIME);
    };
  };

})();
