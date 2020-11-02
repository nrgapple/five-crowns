import React from "react"
import styles from "./Board.module.css"
import Card from "./Card"

export default ({ ctx, G, moves, ...props }) => {
  return (
    <div className={styles.boardContainer}>
      <div />
      <div className={styles.deckContainer}>
        <Card />
      </div>
      <div />
      <div className={styles.discardedCardsContainer}>
        <Card />
      </div>
      <div />
    </div>
  )
}
