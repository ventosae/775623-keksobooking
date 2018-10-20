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
  var mainPin = mapPinBase.querySelector('.map__pin');
  var addressInput = adForm.querySelector('[name="address"]');


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

  var formChangesHandler = function () {
    flatTypeSelection.addEventListener('change', upatedFormFlatType);
    checkOutSelection.addEventListener('change', updateCheckIn);
    checkInSelection.addEventListener('change', updateCheckOut);
  };

  // ВЫЗЫВАТЬСЯ
  var disableAll = function () {
    fullMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('.map__filters');
    allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
    allSelects.forEach(function (element) {
      element.disabled = true;
    });
    addressInput.value = Math.floor((parseInt(mainPin.style.left, 10) + window.data.PIN_GAP_Y)) + ', ' + (parseInt(mainPin.style.top, 10) + window.data.PIN_GAP_X);
    formChangesHandler();
  };

  disableAll();

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
  };

  window.form = {
    enableAll: enableAll,
    disableAll: disableAll
  };

})();

