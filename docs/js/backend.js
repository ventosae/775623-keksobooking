'use strict';

(function () {
  var TIMEOUT_TIME = 10000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  var sendXhrRequest = function (xhr, successHandler, errorHandler, data, request, url) {
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        successHandler(xhr.response);
      } else {
        errorHandler('У нас ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Упс. Ошибочка!');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не пришел после' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;
    xhr.open(request, url);
    xhr.send(data);
  };

  window.backend = {

    load: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      sendXhrRequest(xhr, successHandler, errorHandler, '', 'GET', GET_URL);
    },

    save: function (successHandler, errorHandler, data) {
      var xhr = new XMLHttpRequest();
      sendXhrRequest(xhr, successHandler, errorHandler, data, 'POST', POST_URL);
    },

  };
})();

