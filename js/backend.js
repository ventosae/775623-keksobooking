'use strict';

(function () {
  var TIMEOUT_TIME = 10000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var templateElement = document.querySelector('#error').content.querySelector('.error');

  var onErrorResponse = function (message) {
    window.form.disableAll();
    var messageTemplae = templateElement.cloneNode(true);
    var messageErrorElement = messageTemplae.querySelector('.error__message');
    var messageErrorButton = messageTemplae.querySelector('.error__button');
    messageErrorElement.textContent = message;
    document.querySelector('main').appendChild(messageTemplae);
    var messageError = document.querySelector('.error');
    messageErrorButton.addEventListener('click', function () {
      messageError.remove();
    });
  };

  var sendXhrRequest = function (xhr, onSuccess, onError) {
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
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      sendXhrRequest(xhr, onSuccess, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    onErrorResponse: onErrorResponse
  };
})();

