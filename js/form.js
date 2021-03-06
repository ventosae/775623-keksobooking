'use strict';

(function () {
  var flatTypeSelection = document.querySelector('#type');
  var flatPriceInput = document.querySelector('#price');
  var checkInSelection = document.querySelector('#timein');
  var checkOutSelection = document.querySelector('#timeout');
  var mapForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var fullMap = document.querySelector('.map');
  var allFieldsets = adForm.querySelectorAll('fieldset');
  var allSelects = adForm.querySelectorAll('select');
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
    '1': ['0', '2', '3'],
    '2': ['0', '3'],
    '3': ['0'],
    '100': ['1', '2', '3']

  };
  var capaсityParams = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var filterMain = document.querySelector('.map__filters');
  var featuresFilter = document.querySelector('#housing-features');
  var featuresFilterLarge = document.querySelector('.features');
  var messageTemplate;
  var flatAdTitle = document.querySelector('#title');

  var removeElementHandler = function () {
    messageTemplate.remove();
  };

  var removeElementEscHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      removeElementHandler();
    }
    document.removeEventListener('keydown', removeElementEscHandler);
  };

  var successResponseHandler = function () {
    disableAll();
    messageTemplate = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(messageTemplate);
    messageTemplate.addEventListener('click', removeElementHandler);
    document.addEventListener('keydown', removeElementEscHandler);
  };

  var errorResponseHandler = function (message) {
    disableAll();
    messageTemplate = templateError.cloneNode(true);
    var messageErrorElement = messageTemplate.querySelector('.error__message');
    var messageErrorButton = messageTemplate.querySelector('.error__button');
    messageErrorElement.textContent = message;
    document.querySelector('main').appendChild(messageTemplate);
    messageErrorButton.addEventListener('click', removeElementHandler);
    document.addEventListener('keydown', removeElementEscHandler);
    messageTemplate.addEventListener('click', removeElementHandler);
  };

  var makeFormsRequiredHandler = function (e) {
    e.currentTarget.style.boxShadow = '0 0 2px 2px #ff6547';
  };

  var makeFormsValidHandler = function (e) {
    if (e.currentTarget.validity.valid === true) {
      e.currentTarget.style.boxShadow = null;
    }
  };

  var updateFormFlatTypeHandler = function () {
    var flatIndex = flatTypeSelection.selectedIndex;
    flatPriceInput.placeholder = window.data.FLATS_MIN_PRICES[flatIndex];
    flatPriceInput.min = window.data.FLATS_MIN_PRICES[flatIndex];
  };

  var updateCheckInHandler = function () {
    checkInSelection.selectedIndex = checkOutSelection.selectedIndex;
  };

  var updateCheckOutHandler = function () {
    checkOutSelection.selectedIndex = checkInSelection.selectedIndex;
  };

  var updateCapacityHandler = function () {
    var roomsNumber = roomsSelection.value;
    var roomCapacityElements = Array.from(capacitySelection.children);
    roomCapacityElements.forEach(function (element) {
      element.disabled = false;
    });

    roomCapaсityParams[roomsNumber].forEach(function (data) {
      var optionValue = '[value="' + data + '"]';
      capacitySelection.querySelector(optionValue).disabled = true;
    });


    var validityMessage = (capaсityParams[roomsSelection.value].indexOf(capacitySelection.value) === -1) ? 'Упс, пересмотрите условия.' : '';
    capacitySelection.setCustomValidity(validityMessage);
  };

  var updateCapacityNumber = function () {
    roomsSelection.value = window.data.SELECTION_VALUE;
    capacitySelection.value = window.data.SELECTION_VALUE;
  };

  var featuresFilterHandler = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEY) {
      document.activeElement.click();
    }
  };

  var formChangesHandler = function () {
    flatTypeSelection.addEventListener('change', updateFormFlatTypeHandler);
    checkOutSelection.addEventListener('change', updateCheckInHandler);
    checkInSelection.addEventListener('change', updateCheckOutHandler);
    roomsSelection.addEventListener('change', updateCapacityHandler);
    capacitySelection.addEventListener('change', updateCapacityHandler);
    featuresFilter.addEventListener('keydown', featuresFilterHandler);
    featuresFilterLarge.addEventListener('keydown', featuresFilterHandler);
    flatAdTitle.addEventListener('invalid', makeFormsRequiredHandler);
    flatPriceInput.addEventListener('invalid', makeFormsRequiredHandler);
    capacitySelection.addEventListener('invalid', makeFormsRequiredHandler);
    flatAdTitle.addEventListener('input', makeFormsValidHandler);
    flatPriceInput.addEventListener('input', makeFormsValidHandler);
    capacitySelection.addEventListener('change', makeFormsValidHandler);
  };

  var resetFormChangesHandler = function () {
    flatTypeSelection.removeEventListener('change', updateFormFlatTypeHandler);
    checkOutSelection.removeEventListener('change', updateCheckInHandler);
    checkInSelection.removeEventListener('change', updateCheckOutHandler);
    roomsSelection.removeEventListener('change', updateCapacityHandler);
    capacitySelection.removeEventListener('change', updateCapacityHandler);
    featuresFilter.removeEventListener('keydown', featuresFilterHandler);
    featuresFilterLarge.removeEventListener('keydown', featuresFilterHandler);
    flatAdTitle.removeEventListener('invalid', makeFormsRequiredHandler);
    flatPriceInput.removeEventListener('invalid', makeFormsRequiredHandler);
    capacitySelection.removeEventListener('invalid', makeFormsRequiredHandler);
    flatAdTitle.removeEventListener('input', makeFormsValidHandler);
    flatPriceInput.removeEventListener('input', makeFormsValidHandler);
    capacitySelection.removeEventListener('change', makeFormsValidHandler);
  };

  var removePins = function () {
    mapPinBase.querySelectorAll('button[type="button"]').forEach(function (elem) {
      elem.remove();
    });
  };

  var disableMainFilter = function () {
    var mapFiltersForms = Array.from(filterMain.children);
    mapFiltersForms.forEach(function (elem) {
      elem.disabled = true;
    });
  };

  var disableAll = function () {
    fullMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('.map__filters');
    document.querySelector('.map__pin--main').classList.remove('map__pin--activated');
    addressInput.readOnly = true;
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
    removePins();
    updateCapacityNumber();
    resetFormChangesHandler();
    flatAdTitle.style.boxShadow = null;
    flatPriceInput.style.boxShadow = null;
    capacitySelection.style.boxShadow = null;
    updateFormFlatTypeHandler();
    disableMainFilter();
  };

  disableAll();

  var disableAllHandler = function () {
    disableAll();
    successResponseHandler();
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
    filterMain.addEventListener('change', window.debounce(filterChangeHandler));
    window.imgupload.setActived();
    updateCapacityHandler();
    formChangesHandler();
    disableMainFilter();
  };

  adFormReset.addEventListener('click', disableAll);

  var formSubmitHandler = function (evt) {
    window.backend.save(disableAllHandler, errorResponseHandler, new FormData(adForm));
    evt.preventDefault();
  };

  adForm.addEventListener('submit', formSubmitHandler);

  window.form = {
    enableAll: enableAll,
    disableAll: disableAll,
    errorResponseHandler: errorResponseHandler
  };

  var filterChangeHandler = function () {
    var results = window.filter.filterAll(window.pin.getPinsData());
    removePins();
    window.cards.removeCard();
    window.pin.renderPins(results.slice(0, window.data.ADS_NUMBER));
  };

})();

