/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import Merc from "./Merc"

const mercMap = [0,1]
const waveTimings = [10, 45, 75, 100, 125]

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

const Mercs = ({ timer, target, playSound, difficulty }) => {
  const group = useRef()
  const mercs = useRef(null)
  const wave = useRef(0)
  const player = useRef()

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (mercs.current == null) {
      const tempMercs = []
      for (let i = 0; i < mercMap.length; i++) {
        const node = findNodeByName(state.scene, 'enemy-merc-'+i)
        tempMercs.push(node)
      }
      if (tempMercs.length == 2) {
        mercs.current = tempMercs
      }
      //console.log(drones.current)
      return
    }
    if (player.current == null) {
      const node = findNodeByName(state.scene, "player")
      if (node) player.current = node
      return
    }

    const spawnWave = () => {
      if (wave.current >= waveTimings.length) return
      //console.log("Spawning wave: " + wave.current)

      let spawnNumber = wave.current < 2 ? 1 : 2
      mercs.current.forEach((merc) => {
        if (merc.health > 0) return
        if (spawnNumber <= 0) return

        merc.health = 100
        merc.visible = true

        //merc.position.x = merc.startX
        merc.position.y = 0
        merc.position.z =-20

        spawnNumber -= 1
      })

      wave.current += 1
    }
    if (waveTimings[wave.current] < timer.current) spawnWave()
    
  })

  return (
    <group ref={group} position={[0,0,-4]} >
      { mercMap.map( (drone) => (
        <Merc 
          key={"enemy-drone-"+drone}
          index={drone}
          target={target}
          player={player}
          playSound={playSound}
          difficulty={difficulty}
        />
      )) }
    </group>
  )
}

export default Mercs
