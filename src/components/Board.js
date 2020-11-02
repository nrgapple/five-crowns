import React, { useMemo } from "react"
import styles from "./Board.module.css"
import Card from "./Card"
import Hand from "./Hand"
import ScoreBoard from "./ScoreBoard"
import Table from "./Table"

export default ({
  ctx: { currentPlayer, ...ctx },
  G: { players, discardedCards, round, ...G },
  moves,
  ...props
}) => {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.scoreBoardSection}>
        <ScoreBoard
          players={players}
          round={round}
          currentPlayer={currentPlayer}
        />
      </div>
      <Table topDiscardedCard={discardedCards[0]} />
      <div className={styles.handSection}>
        <Hand cards={players[currentPlayer].hand} />
      </div>
    </div>
  )
}
