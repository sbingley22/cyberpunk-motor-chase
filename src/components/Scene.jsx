/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import Player from "./Player"
import { Environment } from "@react-three/drei"


const Scene = ({ isMobile, cam, setMode, runners, setMissionScore, difficulty, wordList, frontClick }) => {

  const audioGunshot = useRef(null)
  const audioPlayerHit = useRef(null)
  const audioEnemyHit = useRef(null)
  const audioReload = useRef(null)
  const audioShieldHit = useRef(null)
  const audioKill = useRef(null)
  
  useEffect(() => {
    cam.current.lookAt(0, 2, 0)
  }, [])
  
  return (
    <>
      <Environment preset="city" />
      <Player
        runners={runners}
        cam={cam}
        frontClick={frontClick}
      />
    </>
  )
}

export default Scene
