import cards from "./cards"
import {
  pickFromTopOfDeck,
  pickFromTopOfDiscardedCard,
  moveCardToGroup,
} from "./moves"
import { play } from "./phases/play"

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
  moves: { pickFromTopOfDeck, pickFromTopOfDiscardedCard, moveCardToGroup },
  phases: {
    play,
    next: {
      onBegin: (G, ctx) => {
        ctx.events.endPhase()
      },
      endIf: () => true,
      next: "play",
    }
  },
}
