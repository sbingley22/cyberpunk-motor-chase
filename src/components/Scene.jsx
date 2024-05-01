/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import Player from "./Player"
import { Environment } from "@react-three/drei"
import Props from "./Props"
import Road from "./Road"
import Drones from "./Drones"

const Scene = ({ isMobile, name, cam, setMode, runners, altSkin, setMissionScore, difficulty, wordList, frontClick }) => {
  const speed = useRef(25)
  
  // Set cam look at
  useEffect(() => {
    cam.current.lookAt(0, 2, 0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Environment 
        preset="night" 
        background={true} 
        backgroundBlurriness={0.05} 
        backgroundIntensity={3} 
        backgroundRotation={[0, Math.PI * -1.0, 0]}
        environmentRotation={[0, Math.PI * -1.0, 0]}
        environmentIntensity={3} 
      />
      <directionalLight
       position={[1,4,8]}
       intensity={2}
       color={"#FFDDAA"}
      />
      <directionalLight
       position={[2,4,-8]}
       intensity={1}
       color={"#FFDDFF"}
      />

      <Road speed={speed} />

      <Player
        runners={runners}
        altSkin={altSkin}
        cam={cam}
        frontClick={frontClick}
      />

      { name == "front" && <>

      </>}

      { name == "rear" && <>
        <Drones />
      </>}
    </>
  )
}

export default Scene
