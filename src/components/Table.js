import React from "react"
import Card from "./Card"
import styles from "./Table.module.css"

export default ({ topDiscardedCard }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.deckContainer}>
        <Card faceDown  />
      </div>
      <div className={styles.discardedContainer}>
        {topDiscardedCard && (
          <Card suit={topDiscardedCard.suit} value={topDiscardedCard.value} />
        )}
      </div>
    </div>
  )
}
