import React from 'react'
import styles from "./Card.module.css"

export default ({value, suit}) => {
  return <div className={styles.cardContainer}>
    <div className={styles.valueTop}>
      3
    </div>
    <div className={styles.suitTop}>
      2
    </div>
  </div>
}