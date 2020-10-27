import { INVALID_MOVE } from "boardgame.io/core"

export const discardCard = (G, ctx, cardIndex) => {
  console.log("discardCard")
  const oldPlayer = G.players[ctx.currentPlayer]
  console.log(G)
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

export const goOut = (G, ctx, group) => {
  console.log("goOut")
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
    hand:
      parseInt(ctx.currentPlayer) === i
        ? [...x.hand, { card, group: 0 }]
        : x.hand,
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
    hand:
      parseInt(ctx.currentPlayer) === i
        ? [...x.hand, { card, group: 0 }]
        : x.hand,
  }))
  ctx.events.setStage("discardCard")
  return {
    ...G,
    discardedCards,
    players,
  }
}

export const moveCardToGroup1 = (G, ctx, [ cardIndex, groupNumber ]) => {
  console.log({cardIndex, groupNumber})
  if (cardIndex > G.players[ctx.currentPlayer].hand.length - 1)
    return INVALID_MOVE
  if (groupNumber === undefined) {
    console.log(G.players[ctx.currentPlayer].hand.map((x) => x.group))
    const max = Math.max(...G.players[ctx.currentPlayer].hand.map((x) => x.group))
    console.log(max)
    return {
      ...G,
      players: G.players.map((x, i) => ({
        ...x,
        hand:
          parseInt(ctx.currentPlayer) === i
            ? x.hand.map((z, i) =>
                i === cardIndex ? { ...z, group: max + 1 } : z
              )
            : x.hand,
      })),
    }
  }
  return {
    ...G,
    players: G.players.map((x, i) => ({
      ...x,
      hand:
        parseInt(ctx.currentPlayer) === i
          ? x.hand.map((z, i) =>
              i === cardIndex ? { ...z, group: groupNumber } : z
            )
          : x.hand,
    })),
  }
}
