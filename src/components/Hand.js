import React, { memo, useState } from "react"
import { areCardsEqual } from "../util/util"
import Card from "./Card"
import styles from "./Hand.module.css"

export default ({ cards }) => {
  const [activeCard, setActiveCard] = useState(-1)

  console.log(activeCard)
  return (
    <div className={styles.handContainer} onClick={() => setActiveCard(-1)}>
      {cards &&
        cards.map((card, i) => (
          <div
            key={i}
            style={{
              marginTop: activeCard === i ? -16 : 0,
              marginRight: -8,
            }}
            onClick={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation();
              setActiveCard(i)
            }}
          >
            <Card suit={card.suit} value={card.value} />
          </div>
        ))}
    </div>
  )
}
