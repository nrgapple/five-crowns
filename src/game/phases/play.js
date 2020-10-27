import { endTurn, goOut, discardCard } from "../moves"
import { shuffle } from "../utils"

export const play = {
  start: true,
  onBegin: (G, ctx) => {
    console.log(`new round`, G.round)
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
    const round = G.round + 1
    const players = G.players.map((x) => ({
      ...x,
      out: false,
    }))
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
  next: "next",
  turn: {
    onBegin: (G, ctx) => {
      console.log("next up")
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
}
