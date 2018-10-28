'use strict';
(function () {
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var templateFeatures = cardTemplate.querySelector('.popup__features');
  var photosTemplate = cardTemplate.querySelector('.popup__photos');
  var mapMain = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var activeCard;

  var getPhotosFragement = function (card, photos) {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.width = IMAGE_WIDTH;
      photoElement.height = IMAGE_HEIGHT;
      photoElement.alt = card.offer.title;
      photoElement.src = photos[i];
      photoFragment.appendChild(photoElement);
    }
    photosTemplate.innerHTML = '';
    return photoFragment;
  };

  var getFeaturesFragment = function (randomFeatures) {
    var featuresFragment = document.createDocumentFragment();
    if (randomFeatures.length) {
      for (var i = 0; i < randomFeatures.length; i++) {
        var featuresElement = templateFeatures.querySelector('li').cloneNode(true);
        featuresElement.classList.add('popup__feature', 'popup__feature--' + randomFeatures[i]);
        featuresFragment.appendChild(featuresElement);
      }
    }
    templateFeatures.innerHTML = '';
    return featuresFragment;
  };

  var createCardElement = function (card) {
    photosTemplate.appendChild(getPhotosFragement(card, card.offer.photos));
    templateFeatures.appendChild(getFeaturesFragment(card.offer.features));
    var advertCard = cardTemplate.cloneNode(true);
    advertCard.querySelector('.popup__title').textContent = card.offer.title;
    advertCard.querySelector('.popup__text--address').textContent = card.offer.address;
    advertCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    advertCard.querySelector('.popup__type').textContent = window.data.TYPES_RU[card.offer.type].type;
    advertCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    advertCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    advertCard.querySelector('.popup__description').textContent = card.offer.description;
    advertCard.querySelector('.popup__avatar').src = card.author.avatar;

    return advertCard;
  };

  var cardsEscRemoveHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      removeCard();
    }
  };

  var cardsClickRemoveHandler = function () {
    removeCard();
  };

  var cardsEscAddHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      addCard(evt);
    }
  };

  var cardsClickAddHandler = function (evt) {
    addCard(evt);
  };

  var addCard = function (card) {
    var cardFragment = document.createDocumentFragment();
    activeCard = cardFragment.appendChild(createCardElement(card));
    mapMain.insertBefore(cardFragment, mapFilters);

    var btn = activeCard.querySelector('.popup__close');
    btn.focus();
    btn.addEventListener('click', cardsClickRemoveHandler);

    document.addEventListener('keydown', cardsEscRemoveHandler);
  };

  var removeCard = function () {
    if (activeCard) {
      activeCard.parentElement.removeChild(activeCard);
    }
    activeCard = null;
    document.removeEventListener('keydown', cardsEscRemoveHandler);
  };

  window.cards = {
    createCardElement: createCardElement,
    addCard: addCard,
    removeCard: removeCard,
    cardsEscAddHandler: cardsEscAddHandler,
    cardsClickAddHandler: cardsClickAddHandler
  };

})();
