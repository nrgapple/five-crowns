import React from 'react'
import { SuitSpade, SuitClub, SuitDiamond, Star, SuitHeart, Lightning} from "react-bootstrap-icons"

export default ({suit, value}) => {
  if (value && value === "X") return <Lightning color="green" />
  switch (suit) {
    case "diamonds":
      return <SuitDiamond color="red"/>
    case "hearts":
      return <SuitHeart color="red"/>
    case "spades":
      return <SuitSpade />
    case "clubs":
      return <SuitClub />
    case "star":
      return <Star color="blue"/>
    default:
      break;
  }
}

