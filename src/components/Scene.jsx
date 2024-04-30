/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import Player from "./Player"
import { Environment } from "@react-three/drei"


const Scene = ({ isMobile, cam, setMode, runners, setMissionScore, difficulty, wordList, frontClick }) => {
  
  useEffect(() => {
    cam.current.lookAt(0, 2, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Environment preset="night" background={true} blur={0.5} environmentIntensity={1} />
      <Player
        runners={runners}
        cam={cam}
        frontClick={frontClick}
      />
    </>
  )
}

export default Scene
