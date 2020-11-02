import React from "react"
import styles from "./Card.module.css"
import Suit from "./Suit"

export default ({ value, suit, faceDown = false }) => {
  return faceDown ? (
    <div className={styles.cardContainerFaceDown} />
  ) : (
    <div className={styles.cardContainer}>
      <div className={styles.valueTop}>{value}</div>
      <div className={styles.suitTop}>
        <Suit suit={suit} value={value} />
      </div>
      <div className={styles.valueBottom}>{value}</div>
      <div className={styles.suitBottom}>
        <Suit suit={suit} value={value} />
      </div>
    </div>
  )
}
