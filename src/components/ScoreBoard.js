import React from "react"
import styles from "./ScoreBoard.module.css"

export default ({ players, round, currentPlayer }) => {
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.gameInfo}>
        <div>
          <strong>Round:</strong>
        </div>
        <div>{round}</div>
        <div>
          <strong>Player up:</strong>
        </div>
        <div>{players[currentPlayer].name}</div>
      </div>
      <div className={styles.players}></div>
    </div>
  )
}
