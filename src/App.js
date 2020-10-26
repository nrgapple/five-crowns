import "./App.css"
import { fiveCrowns } from "./game/game"
import Board from "./components/Board"
import { Client } from "boardgame.io/react"

export default Client({game: fiveCrowns})
