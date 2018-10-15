'use strict';

(function () {
  var flatTypeSelection = document.querySelector('#type');
  var flatPriceInput = document.querySelector('#price');
  var checkInSelection = document.querySelector('#timein');
  var checkOutSelection = document.querySelector('#timeout');

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
    window.data.FULL_MAP.classList.add('map--faded');
    window.data.AD_FORM.classList.add('ad-form--disabled');
    window.data.MAP_FORM.classList.add('.map__filters');
    window.data.ALL_FIELDSETS.forEach(function (element) {
      element.disabled = true;
    });
    window.data.ALL_SELECTS.forEach(function (element) {
      element.disabled = true;
    });
    window.data.ADDRESS_INPUT.value = Math.floor((parseInt(window.data.MAIN_PIN.style.left, 10) + window.data.PIN_GAP_Y)) + ', ' + (parseInt(window.data.MAIN_PIN.style.top, 10) + window.data.PIN_GAP_X);
    formChangesHandler();
  };

  disableAll();

  var enableAll = function () {
    window.data.FULL_MAP.classList.remove('map--faded');
    window.data.AD_FORM.classList.remove('ad-form--disabled');
    window.data.MAP_FORM.classList.remove('.map__filters');
    window.data.ALL_FIELDSETS.forEach(function (element) {
      element.disabled = false;
    });
    window.data.ALL_SELECTS.forEach(function (element) {
      element.disabled = false;
    });
  };

  window.form = {
    enableAll: enableAll
  };

})();

