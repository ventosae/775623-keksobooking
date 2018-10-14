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
  (function () {
    window.data.fullMap.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.mapForm.classList.add('.map__filters');
    window.data.allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
    window.data.allSelects.forEach(function (element) {
      element.disabled = true;
    });
    window.data.addressInput.value = Math.floor((parseInt(window.data.mainPin.style.left, 10) + window.data.pinGapY)) + ', ' + (parseInt(window.data.mainPin.style.top, 10) + window.data.pinGapX);
    formChangesHandler();
  })();

  var enableAll = function () {
    window.data.fullMap.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.data.mapForm.classList.remove('.map__filters');
    window.data.allFieldsets.forEach(function (element) {
      element.disabled = false;
    });
    window.data.allSelects.forEach(function (element) {
      element.disabled = false;
    });
  };

  window.form = {
    enableAll: enableAll
  };

})();

