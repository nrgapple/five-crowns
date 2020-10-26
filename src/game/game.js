import cards from "./cards"
import { shuffle } from "./utils"
import { INVALID_MOVE } from "boardgame.io/core"

const discardCard = (G, ctx, cardIndex) => {
  console.log("discardCard")
  const oldPlayer = G.players[ctx.currentPlayer]
  if (!oldPlayer.hand[cardIndex]) return INVALID_MOVE
  const discardedCard = oldPlayer.hand[cardIndex]
  const discardedCards = [...G.discardedCards, discardedCard]
  const players = G.players.map((x, i) => {
    if (i === ctx.currentPlayer) {
      return {
        ...x,
        hand: [...[x].splice(cardIndex, 1)],
      }
    }
    return x
  })
  ctx.events.endStage()
  return { ...G, players, discardedCards }
}

const goOut = (G, ctx) => {
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

const endTurn = (G, ctx) => {
  if (G.players.some((x) => x.out === true)) return INVALID_MOVE
  ctx.events.endTurn()
}

const pickFromTopOfDeck = (G, ctx) => {
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

const pickFromTopOfDiscardedCard = (G, ctx) => {
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

export const fiveCrowns = {
  setup: (ctx) => ({
    
    deck: [...cards, ...cards],
    discardedCards: [],
    players: new Array(ctx.numPlayers).fill([]).map((x, i) => ({
      hand: [],
      name: `Player ${i}`,
      score: new Array(10).fill(0),
      out: false,
    })),
    round: 3,
    totalRounds: 13,
  }),
  moves: { pickFromTopOfDeck, pickFromTopOfDiscardedCard },
  phases: {
    play: {
      start: true,
      onBegin: (G, ctx) => {
        // shuffle and give cards.
        let deck = shuffle([...G.deck])
        const players = G.players.map((x) => ({
          ...x,
          hand: new Array(G.round).fill(undefined).map((y) => deck.pop()),
        }))
        const discardedCards = [deck.pop()]
        return {
          ...G,
          deck,
          players,
          discardedCards,
        }
      },
      onEnd: (G, ctx) => {
        // TODO: Score up players.

        // TODO: end game if last round.
        const round = round + 1
        const players = G.players.map(x => ({
          ...x,
          out: false,
        }))
        ctx.events.setPhase("play")
        console.log("ending ending")
        return {
          ...G,
          round,
          players,
        }
      },
      endIf: (G, ctx) => {
        return G.players.every((x) => x.out === true)
      },
      turn: {
        onBegin: (G, ctx) => {
          console.log(ctx)
         // ctx.events.setStage("pickCard")
          return G
        },
        stages: {
          discardCard: {
            moves: { discardCard },
            next: "finish",
          },
          finish: {
            moves: { goOut, endTurn },
          },
        },
      },
    },
  },
}
