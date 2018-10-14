'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var templateFeatures = cardTemplate.querySelector('.popup__features');
  var photosTemplate = cardTemplate.querySelector('.popup__photos');

  var getPhotosFragement = function (photos) {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photoElement = photosTemplate.querySelector('img').cloneNode(true);
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
    } else {
      templateFeatures.classList.add('hidden');
    }
    templateFeatures.innerHTML = '';
    return featuresFragment;
  };

  var createCardElement = function (card) {
    photosTemplate.appendChild(getPhotosFragement(card.offer.photos));
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

  window.cards = {
    createCardElement: createCardElement
  };

})();
