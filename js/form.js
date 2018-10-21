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
  var mainPinMain = mapPinBase.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('[name="address"]');
  var mapFileterForm = document.querySelector('.map__filters');
  var adFormReset = adForm.querySelector('.ad-form__reset');


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

  var disableAll = function () {
    fullMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('.map__filters');
    var list = document.querySelectorAll('button[type="button"]');

    adForm.reset();
    mapFileterForm.reset();

    allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
    allSelects.forEach(function (element) {
      element.disabled = true;
    });

    var yvalue = Math.floor((parseInt(mainPin.style.left, 10) + window.data.PIN_GAP_Y));
    var xvalue = (parseInt(mainPin.style.top, 10) + window.data.PIN_GAP_X);
    addressInput.value = yvalue + ', ' + xvalue;
    mainPinMain.style.left = window.data.MAIN_PIN_BASE_Y + 'px';
    mainPinMain.style.top = window.data.MAIN_PIN_BASE_X + 'px';
    formChangesHandler();

    for (var pins = 0; pins < list.length; pins++) {
      list[pins].remove();
    }
    // list.forEach(function () {
    //   list.remove();
    // });
    // почему-то не сработало
  };

  disableAll();

  var disableAllOnSuccess = function () {
    disableAll();
    window.backend.onSuccessResponse();
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
  };

  adFormReset.addEventListener('click', disableAll);

  var formSubmit = function (evt) {
    window.backend.save(disableAllOnSuccess, window.backend.onErrorResponse, new FormData(adForm));
    evt.preventDefault();
  };

  adForm.addEventListener('submit', formSubmit);

  window.form = {
    enableAll: enableAll,
    disableAll: disableAll
  };

})();

