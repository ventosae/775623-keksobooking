'use strict';

(function () {
  var flatTypeSelection = document.querySelector('#type');
  var flatPriceInput = document.querySelector('#price');
  var checkInSelection = document.querySelector('#timein');
  var checkOutSelection = document.querySelector('#timeout');
  var mapForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var fullMap = document.querySelector('.map');
  var allFieldsets = document.querySelectorAll('fieldset');
  var allSelects = document.querySelectorAll('select');
  var mapPinBase = document.querySelector('.map__pins');
  var mainPinMain = mapPinBase.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('[name="address"]');
  var mapFileterForm = document.querySelector('.map__filters');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var roomsSelection = document.querySelector('#room_number');
  var capacitySelection = document.querySelector('#capacity');
  var roomCapaсityParams = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var filterMain = document.querySelector('.map__filters');


  var onSuccessResponse = function () {
    window.form.disableAll();
    var messageTemplate = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(messageTemplate);
    var removeElementClick = function () {
      messageTemplate.remove();
    };
    var removeElementEsc = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data.ESC_KEY) {
          removeElementClick();
        }
      });
      document.removeEventListener('keydown', removeElementEsc);
    };
    messageTemplate.addEventListener('click', removeElementClick);
    document.addEventListener('keydown', removeElementEsc); // не получается удалить listener
  };

  var onErrorResponse = function (message) {
    disableAll();
    var messageTemplate = templateError.cloneNode(true);
    var messageErrorElement = messageTemplate.querySelector('.error__message');
    var messageErrorButton = messageTemplate.querySelector('.error__button');
    messageErrorElement.textContent = message;
    document.querySelector('main').appendChild(messageTemplate);

    var removeElementClick = function () {
      messageTemplate.remove();
    };

    var removeElementEsc = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data.ESC_KEY) {
          removeElementClick();
        }
      });
      document.removeEventListener('keydown', removeElementEsc);
    };

    messageErrorButton.addEventListener('click', removeElementClick);
    document.addEventListener('keydown', removeElementEsc); // не получается удалить listener
  };

  var upatedFormFlatType = function () {
    var flatIndex = flatTypeSelection.selectedIndex;
    flatPriceInput.placeholder = window.data.FLATS_MIN_PRICES[flatIndex];
    flatPriceInput.min = window.data.FLATS_MIN_PRICES[flatIndex];
  };

  var updateCheckIn = function () {
    checkInSelection.selectedIndex = checkOutSelection.selectedIndex;
  };

  var updateCheckOut = function () {
    checkOutSelection.selectedIndex = checkInSelection.selectedIndex;
  };

  var onCountChange = function () {
    var capacityNumber = capacitySelection.value;
    var roomsNumber = roomsSelection.value;
    var validityMessage = (roomCapaсityParams[roomsNumber].indexOf(capacityNumber) === -1) ?
      'Упс, слишком много гостей да слишком мало комнат!' : '';
    capacitySelection.setCustomValidity(validityMessage);
  };

  var updateCapacityNumber = function () {
    roomsSelection.value = (capacitySelection.options[capacitySelection.selectedIndex].value === '0') ? '100' : roomsSelection.value = capacitySelection.options[capacitySelection.selectedIndex].value;
  };

  var formChangesHandler = function () {
    flatTypeSelection.addEventListener('change', upatedFormFlatType);
    checkOutSelection.addEventListener('change', updateCheckIn);
    checkInSelection.addEventListener('change', updateCheckOut);
    roomsSelection.addEventListener('change', onCountChange);
    capacitySelection.addEventListener('change', onCountChange);
  };

  var removePins = function () {
    mapPinBase.querySelectorAll('button[type="button"]').forEach(function (elem) {
      elem.remove();
    });

  };

  var disableAll = function () {

    fullMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('.map__filters');
    document.querySelector('.map__pin--main').classList.remove('map__pin--activated');

    adForm.reset();
    mapFileterForm.reset();

    allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
    allSelects.forEach(function (element) {
      element.disabled = true;
    });

    addressInput.value = window.data.MAIN_PIN_BASE_Y_VALUE + ', ' + window.data.MAIN_PIN_BASE_X_VALUE;
    mainPinMain.style.left = window.data.MAIN_PIN_BASE_Y + 'px';
    mainPinMain.style.top = window.data.MAIN_PIN_BASE_X + 'px';

    window.imgupload.setDisabled();
    window.cards.removeCard();
    formChangesHandler();
    removePins();
    updateCapacityNumber();
  };


  disableAll();

  var disableAllOnSuccess = function () {
    disableAll();
    onSuccessResponse();
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
    filterMain.addEventListener('change', window.debounce(onFilterChange));
    window.imgupload.setActived();
  };

  adFormReset.addEventListener('click', disableAll);

  var formSubmit = function (evt) {
    window.backend.save(disableAllOnSuccess, onErrorResponse, new FormData(adForm));
    evt.preventDefault();
  };

  adForm.addEventListener('submit', formSubmit);

  window.form = {
    enableAll: enableAll,
    disableAll: disableAll,
    onErrorResponse: onErrorResponse
  };

  var onFilterChange = function () {
    var results = window.filter.filterAll(window.pin.getPinsData());
    removePins();
    window.cards.removeCard();
    window.pin.renderPins(results.slice(0, window.data.ADS_NUMBER));
  };

})();

