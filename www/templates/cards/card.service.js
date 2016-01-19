angular
  .module('app')


.factory("CardService", CardService);

    function CardService() {

  var cardTypes =
    [
      {
        "id":1,
        "phrase":"One Legged Skier",
        "alt_phrase":"Pussy Cat"
      },
      {
        "id":2,
        "phrase":"Psychedelic Trip",
        "alt_phrase":"Tooth Fairy"
      },
      {
        "id":3,
        "phrase":"European Creeper",
        "alt_phrase":"Long Brown Hair"
      },
      {
        "id":4,
        "phrase":"Twerking Santa",
        "alt_phrase":"Rock A By Baby"
      },
      {
        "id":5,
        "phrase":"Pregnant Twerker",
        "alt_phrase":"Bug On The Ceiling"
      },
      {
        "id":6,
        "phrase":"Police Brutality",
        "alt_phrase":"Walking On The Sun"
      },
      {
        "id":7,
        "phrase":"Taser Victim",
        "alt_phrase":"Milky Way Galaxy"
      },
      {
        "id":8,
        "phrase":"Shwag Weed",
        "alt_phrase":"Dance The Night Away"
      },
      {
        "id":9,
        "phrase":"Bong Rip",
        "alt_phrase":"The Roof Is Out Fire"
      },
      {
        "id":10,
        "phrase":"Panty Thief",
        "alt_phrase":"Michael Jackson Moves"
      },
    ];

  var activeCard = cardTypes[0]; //initialize with 0

  function setActiveCard(index) {
      activeCard = cardTypes[index];
      console.log('activeCard is now ' + activeCard)
  }
  return {
    all: function() {
      return cardTypes;
    },
    first: function() {
      return cardTypes[0].phrase;
    },
    oneCard: function() {
      return cardTypes.slice(0,1);
    },
    threeCards: function() {
      return cardTypes.slice(0,3);
    },
    dealCards: function() {
      return cardTypes.slice(0,3);
    },
    reload: function() {
      return cardTypes.slice(0,3);
    },
    destroyCard: function(index) {
      return cardTypes.slice(index, 1);
    },
    remove: function(card) {
      cardTypes.splice(cards.indexOf(card), 1);
    },
    activeCard: function() {
      return activeCard;
    },
    getActiveCard: function(index) {
      setActiveCard(index);
      console.log(activeCard);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (card[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    } // get:
  };
};