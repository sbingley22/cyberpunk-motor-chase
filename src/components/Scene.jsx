/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import Player from "./Player"
import { Environment, Html } from "@react-three/drei"
import Road from "./Road"
import Drones from "./Drones"
import { useFrame } from "@react-three/fiber"
import BackgoundProps from "./BackgoundProps"
import RoadBlocks from "./RoadBlocks"
import Mercs from "./Mercs"

const droneAmount = 5
const mercAmount = 2

const findNodeByName = (parent, name) => {
  if (parent.name === name) {
    return parent
  }
  for (const child of parent.children) {
    const found = findNodeByName(child, name)
    if (found) {
      return found
    }
  }
  return null
}

// eslint-disable-next-line no-unused-vars
const Scene = ({ isMobile, name, cam, setMode, runners, altSkin, setMissionScore, difficulty, wordList, frontClick, backClick }) => {
  const speed = useRef(difficulty == 1 ? 35 : difficulty == 2 ? 50 : 25)
  const timer = useRef(0)
  
  const target = useRef(null)
  const drones = useRef(null)
  const mercs = useRef(null)

  const audioGunshot = useRef()
  const audioPlayerHit = useRef()
  const audioEnemyHit = useRef()
  const audioReload = useRef()
  const audioShieldHit = useRef()
  const audioKill = useRef()
  
  // Set cam look at
  useEffect(() => {
    cam.current.lookAt(0, 2, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Play Sound
  const playSound = (soundName) => {
    if (!audioGunshot.current) return
    if (!audioEnemyHit.current) return
    if (!audioKill.current) return
    if (!audioPlayerHit.current) return
    if (!audioReload.current) return
    if (!audioShieldHit.current) return

    if (soundName == "gunshot") {
      audioGunshot.current.play()
      audioGunshot.current.loop = true
    } else if (soundName == "shieldHit") {
      audioEnemyHit.current.play()
      audioEnemyHit.current.loop = true
      audioEnemyHit.current.volume = 0.6
      audioEnemyHit.current.playbackRate = 3
    } else if (soundName == "enemyHit") {
      audioShieldHit.current.play()
      audioShieldHit.current.loop = true
      audioShieldHit.current.volume = 1.0
      audioShieldHit.current.playbackRate = 3
    } else if (soundName == "kill") {
      audioKill.current.currentTime = 0
      audioKill.current.play()
      audioKill.current.volume = 1.0
    } else if (soundName == "roadHit") {
      audioReload.current.currentTime = 0
      audioReload.current.play()
      audioReload.current.volume = 1.0
    }
  }
  // Stop Sound
  const stopSound = (soundName) => {
    if (!audioGunshot.current) return
    if (!audioEnemyHit.current) return
    if (!audioKill.current) return
    if (!audioPlayerHit.current) return
    if (!audioReload.current) return
    if (!audioShieldHit.current) return

    if (soundName == "gunshot") {
      audioGunshot.current.currentTime = 0
      audioGunshot.current.pause()
    } else if (soundName == "shieldHit") {
      audioEnemyHit.current.currentTime = 0
      audioEnemyHit.current.pause()
    } else if (soundName == "enemyHit") {
      audioShieldHit.current.currentTime = 0
      audioShieldHit.current.pause()
    }
  }
  
  useFrame((state, delta) => {
    if (drones.current == null) {
      const tempDrones = []
      for (let i = 0; i < droneAmount; i++) {
        const node = findNodeByName(state.scene, 'enemy-drone-'+i)
        tempDrones.push(node)
      }
      if (tempDrones.length == 5) {
        drones.current = tempDrones
      }
      return
    }
    if (mercs.current == null) {
      const tempMercs = []
      for (let i = 0; i < mercAmount; i++) {
        const node = findNodeByName(state.scene, 'enemy-merc-'+i)
        tempMercs.push(node)
      }
      if (tempMercs.length == 2) {
        mercs.current = tempMercs
      }
      return
    }

    timer.current += delta

    if (name == "rear") {
      if (backClick.current[0] != -1) {
        //console.log("Clicked back view at: ", backClick.current)
        const bcX = backClick.current[0]
        const bcY = backClick.current[1]
        let clickX = -1
        let clickY = -1

        if (bcX < 0.33) clickX = 1
        else if (bcX < 0.67) clickX = 2
        else clickX = 3
        if (bcY < 0.12) clickY = 1
        else if (bcY < 0.24) clickY = 2
        else if (bcY < 0.3) clickY = 3
        else if (bcY < 0.8) clickY = 4
        else clickY = 5

        if (clickY < 4) {
          drones.current.forEach( (drone) => {
            if (drone.clickX == clickX && drone.clickY == clickY) {
              if (drone.health <= 0) return
              target.current = drone.name
            }
          } )
        } else if (clickY == 4) {
          //console.log(clickX)
          mercs.current.forEach( (merc, index) => {
            if ( (index == 0 && clickX == 1) || (index == 1 && clickX == 3) ) {
              if (merc.health <= 0) return
              target.current = merc.name
            }
          })
        }
        
        backClick.current = [-1,-1]
      }
    }

  })
  
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

      <BackgoundProps speed={speed} />

      <Player
        runners={runners}
        altSkin={altSkin}
        cam={cam}
        frontClick={frontClick}
        timer={timer}
        target={target}
        setMode={setMode}
        setMissionScore={setMissionScore}
        playSound={playSound}
        stopSound={stopSound}
      />

      { name == "front" && <>
        <RoadBlocks speed={speed} />
      </>}

      { name == "rear" && <>
        <Drones
          timer={timer}
          target={target}
          playSound={playSound}
          difficulty={difficulty}
        />
        <Mercs
          timer={timer}
          target={target}
          playSound={playSound}
          difficulty={difficulty}
        />
      </>}

      <Html>
        <audio ref={audioGunshot} >
          <source src="./audio/gunshot.wav" type="audio/wav" />
        </audio>
        <audio ref={audioKill} >
          <source src="./audio/kill.wav" type="audio/wav" />
        </audio>
        <audio ref={audioPlayerHit} >
          <source src="./audio/playerHit.wav" type="audio/wav" />
        </audio>
        <audio ref={audioEnemyHit} >
          <source src="./audio/enemyHit.wav" type="audio/wav" />
        </audio>
        <audio ref={audioReload} >
          <source src="./audio/reload.wav" type="audio/wav" />
        </audio>
        <audio ref={audioShieldHit} >
          <source src="./audio/shieldHit.wav" type="audio/wav" />
        </audio>
      </Html>

    </>
  )
}

export default Scene
