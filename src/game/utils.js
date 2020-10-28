export const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const getCardScore = (card, currentRoundValue) => {
  switch (card.value) {
    case "K":
      return 13
    case "Q":
      return 12
    case "J":
      return 11
    case "X":
      return 50
    case currentRoundValue:
      return 20
    default:
      return card.value
  }
}

const isWild = (card, currentRoundValue) => {
  return card.value === "X" || card.value === currentRoundValue
}

export const getCardInt = (card) => {
  switch (card.value) {
    case "K":
      return 13
    case "Q":
      return 12
    case "J":
      return 11
    case "X":
      return 14
    default:
      return card.value
  }
}

export const getValueFromInt = (number) => {
  switch (card.value) {
    case 14:
      return "X"
    case 13:
      return "K"
    case 12:
      return "Q"
    case 11:
      return "J"
    default:
      return card.value
  }
}

const getSuitValue = (suit) => {
  switch (suit) {
    case "hearts":
      return 0
    case "diamonds":
      return 15
    case "clubs":
      return 30
    case "spades":
      return 45
    case "star":
      return 60
  }
}

export const getCardTotalValue = (card) => {
  return card.value + getSuitValue(card.suit)
}

const filterWildcards = (hand, currentRoundValue) => {
  const pureHand = hand.filter((x) => !isWild(x, currentRoundValue))
  const numberOfWilds = hand.reduce(
    (a, c, i) => (isWild(c, currentRoundValue) ? a + 1 : 0),
    0
  )
  return { pureHand, numberOfWilds }
}

const getNumberOfMissingCards = (sortedHand) => {
  const [min, ...max] = sortedHand
  const numberOfMiddle = sortedHand - 2
  return numberOfMiddle > 0 ? max - min - 1 - sortedHand - 2 : 0
}

export const checkBook = (hand, currentRoundValue) => {
  // wrong size
  if (hand.length < 3) return false
  const { pureHand, numberOfWilds } = filterWildcards(hand, currentRoundValue)

  // If there is only one pure hand in your hand you have all other wilds.
  if (pureHand.length === 1) return true

  if (new Set(pureHand.map((x) => x.value)).size === 1) return true

  return false
}

export const checkRun = (hand, currentRoundValue) => {
  if (hand.length < 3) return false
  const { pureHand, numberOfWilds } = filterWildcards(hand, currentRoundValue)
  // If there is only one pure hand in your hand you have all other wilds.
  if (pureHand.length <= 1) return true

  // Two card have the same face value
  if (new Set(pureHand.map((x) => x.value)).size !== pureHand.length)
    return false

  // More than one suit
  if (new Set(pureHand.map((x) => x.suit)).size > 1) return false

  // With cards sorts and all unique the amount of missing cards
  // is less than or equal to the number of wilds.
  if (
    getNumberOfMissingCards(pureHand.map((x) => getCardInt(x))).sort() <=
    numberOfWilds
  )
    return true

  return false
}

export const generatePossibleCombinations = (hand, currentRoundValue) => {
  const wildsAndJokers = hand.filter(x => isWild(x, currentRoundValue))
  const kings = hand.filter(x => x.value === "K").sort((a, b) => getCardTotalValue(a) - getCardTotalValue(b))
  const jokers = hand.filter(x => x.value === 10).sort((a, b) => getCardTotalValue(a) - getCardTotalValue(b))
  const jacksAndQueens = hand.filter(x => x.value === "Q" || x.value === "J").sort((a, b) => getCardTotalValue(a) - getCardTotalValue(b))
  const others = hand.filter(x => {
    return x.value !== "K" ||
      x.value !== "Q" ||
      x.value !== "J" ||
      x.value !== 10 ||
      x.value !== currentRoundValue
  }).sort((a, b) => getCardTotalValue(a) - getCardTotalValue(b))
  const sortedHand = [...others, ...jokers, ...kings]

  const maxNumber = sortedHand - wildsAndJokers.length
  const minNumber = 3 - (wildsAndJokers.length > 2 ? 3 : wildsAndJokers.length)

  for (i = minNumber; i <= maxNumber; i++) {
    for (y = 0; y <= maxNumber - i; y++) {
      
    }
  }
}
