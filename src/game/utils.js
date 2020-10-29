import cards from "./cards"

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

const areCardsEqual = (cardA, cardB) => {
  return cardA.value === cardB.value && cardA.suit === cardB.suit
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
  switch (number) {
    case 14:
      return "X"
    case 13:
      return "K"
    case 12:
      return "Q"
    case 11:
      return "J"
    default:
      return number
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

const checkBook = (hand, currentRoundValue) => {
  // wrong size
  if (hand.length < 3) return false
  const { pureHand, numberOfWilds } = filterWildcards(hand, currentRoundValue)

  // If there is only one pure hand in your hand you have all other wilds.
  if (pureHand.length === 1) return true

  if (new Set(pureHand.map((x) => x.value)).size === 1) return true

  return false
}

const checkRun = (hand, currentRoundValue) => {
  if (hand.length < 3) return false
  const { pureHand, numberOfWilds } = filterWildcards(hand, currentRoundValue)
  // If there is only one pure card in your hand you have all other wilds.
  if (pureHand.length <= 1) return true

  // Two card have the same face value
  if (new Set(pureHand.map((x) => x.value)).size !== pureHand.length)
    return false

  // More than one suit
  if (new Set(pureHand.map((x) => x.suit)).size > 1) return false

  // With cards sorts and all unique the amount of missing cards
  // is less than or equal to the number of wilds.
  if (
    getNumberOfMissingCards(pureHand.map((x) => getCardInt(x)).sort()) <=
    numberOfWilds
  )
    return true

  return false
}

const generatePossibleCombinations = (hand, currentRoundValue) => {
  const wildsAndJokers = hand.filter((x) => isWild(x, currentRoundValue))
  const sortedHand = hand
    .sort((a, b) => getCardTotalValue(a) - getCardTotalValue(b))
    .filter((x) => !isWild(x, currentRoundValue))

  let maxNumber = sortedHand.length - wildsAndJokers.length
  let minNumber = 3 - (wildsAndJokers.length > 2 ? 3 : wildsAndJokers.length)
  let numCardCurrCombo = minNumber

  let combinations = []
  while (numCardCurrCombo <= maxNumber) {
    let startIndexcurrCombo = 0
    while (startIndexcurrCombo <= maxNumber - numCardCurrCombo) {
      let currCombo = []
      for (
        let i = startIndexcurrCombo;
        i < numCardCurrCombo + startIndexcurrCombo;
        i++
      ) {
        if (i < sortedHand.length) {
          currCombo = [...currCombo, sortedHand[i]]
        }
        combinations = [...combinations, currCombo]
      }
      startIndexcurrCombo++
    }
    numCardCurrCombo++
  }

  const suits = Array.from(new Set(cards.map((x) => x.suit)))

  maxNumber = sortedHand.length
  numCardCurrCombo = minNumber
  suits.forEach((suit) => {
    const currSuitCards = sortedHand.filter((x) => x.suit === suit)

    while (numCardCurrCombo <= maxNumber) {
      let startIndexcurrCombo = 0
      while (startIndexcurrCombo <= maxNumber - numCardCurrCombo) {
        let currCombo = []
        for (
          let i = startIndexcurrCombo;
          i < numCardCurrCombo + startIndexcurrCombo;
          i++
        ) {
          if (i < currSuitCards.length) {
            currCombo = [...currCombo, currSuitCards[i]]
          }
        }
        if (
          !combinations.some(
            (x) => JSON.stringify(x) === JSON.stringify(currCombo)
          )
        ) {
          combinations = [...combinations, currCombo]
        }
        startIndexcurrCombo++
      }
      numCardCurrCombo++
    }
  })

  return listBooksAndRuns(combinations.map((x) => [...x, ...wildsAndJokers]))
}

const listBooksAndRuns = (combos) => {
  return combos.filter((x) => checkBook(x) || checkRun(x))
}

export const bestBookRunCombination = (hand, currRoundValue) => {
  let recursiveBookRunHands = []
  let handScore = hand.reduce((acc, curr) => acc + getCardScore(curr), 0)
  let bestHand = []

  const recurse = (newHand) => {
    const allPossibleCombos = generatePossibleCombinations(newHand, currRoundValue)
    console.log(`combos`, JSON.stringify(allPossibleCombos))
    console.log(JSON.stringify(hand))
    if (allPossibleCombos.length === 0) {
      console.log("DONE")
      const currScore = newHand.reduce(
        (acc, curr) => acc + getCardScore(curr),
        0
      )
      if (currScore <= handScore) {
        recursiveBookRunHands = [newHand]
        if (currScore < handScore) {
          bestHand = newHand
        }
        handScore = currScore
      }
      console.log(handScore)
      return handScore
    }
    for(const combo of allPossibleCombos) {

      const handAfterRemoval = newHand.filter((card) =>
        !combo.some((x) => {
          return areCardsEqual(x, card)
        })
      )
      console.log({handAfterRemoval: JSON.stringify(handAfterRemoval)})
      recurse(handAfterRemoval)
    }
  }

  const score = recurse(hand)
  return { score, bestHand }
}
