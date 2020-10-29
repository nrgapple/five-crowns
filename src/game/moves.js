import { INVALID_MOVE } from "boardgame.io/core"
import { bestBookRunCombination, getValueFromInt } from "./utils"

export const discardCard = (G, ctx, cardIndex) => {
  console.log("discardCard")
  const oldPlayer = G.players[ctx.currentPlayer]
  if (!oldPlayer.hand[cardIndex]) return INVALID_MOVE
  const discardedCard = oldPlayer.hand[cardIndex].card
  const discardedCards = [...G.discardedCards, discardedCard]
  const players = G.players.map((x, i) => {
    if (i === parseInt(ctx.currentPlayer)) {
      return {
        ...x,
        hand: x.hand.filter((y, i) => i !== cardIndex),
      }
    }
    return x
  })
  ctx.events.endStage()
  return { ...G, players, discardedCards }
}

export const goOut = (G, ctx) => {
  console.log("goOut")
  const { hand, name } = G.players[ctx.currentPlayer]
  const { score, bestHand } = bestBookRunCombination(hand, getValueFromInt(G.round))
  console.log(`${name}'s score:`, score)
  console.log(`Best hand ${JSON.stringify(bestHand)}`)
  if (score !== 0) return INVALID_MOVE
  const players = G.players.map((x, i) => ({
    ...x,
    out: parseInt(ctx.currentPlayer) === i ? true : x.out,
  }))
  ctx.events.endTurn()
  console.log(`goOut ctx`, players)
  return {
    ...G,
    players,
  }
}

export const endTurn = (G, ctx) => {
  if (G.players.some((x) => x.out === true)) return INVALID_MOVE
  ctx.events.endTurn()
}

export const pickFromTopOfDeck = (G, ctx) => {
  console.log("pickFromTopOfDeck")
  let deck = [...G.deck]
  const card = deck.pop()
  const players = G.players.map((x, i) => ({
    ...x,
    hand: parseInt(ctx.currentPlayer) === i ? [...x.hand, card] : x.hand,
  }))
  ctx.events.setStage("discardCard")
  return {
    ...G,
    deck,
    players,
  }
}

export const pickFromTopOfDiscardedCard = (G, ctx) => {
  console.log("pickFromTopOfDiscardedCard")
  const discardedCards = [...G.discardedCards]
  const card = discardedCards.pop()
  const players = G.players.map((x, i) => ({
    ...x,
    hand: parseInt(ctx.currentPlayer) === i ? [...x.hand, card] : x.hand,
  }))
  ctx.events.setStage("discardCard")
  return {
    ...G,
    discardedCards,
    players,
  }
}
