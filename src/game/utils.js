export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const getCardScore = (card, currentRoundCard) => {
  switch (card.value) {
    case "K": 
      return 13
    case "Q": 
      return 12
    case "J": 
      return 11
    case "X": 
      return 50
    case currentRoundCard:
      return 20
    default:
      return card.value
  }
  
}