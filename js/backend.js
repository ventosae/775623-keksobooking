'use strict';

(function () {
  var TIMEOUT_TIME = 10000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  var sendXhrRequest = function (xhr, onSuccess, onError, data, request, url) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('У нас ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Упс. Ошибочка!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не пришел после' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;
    xhr.open(request, url);
    xhr.send(data);
  };

  window.backend = {

    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      sendXhrRequest(xhr, onSuccess, onError, '', 'GET', GET_URL);
    },

    save: function (onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();
      sendXhrRequest(xhr, onSuccess, onError, data, 'POST', POST_URL);
    },

  };
})();

