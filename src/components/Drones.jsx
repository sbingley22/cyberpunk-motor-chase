/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber"
import Drone from "./Drone"
import { useRef } from "react"

const droneMap = [0,1,2,3,4]
const waveTimings = [2, 35, 65, 90, 120]

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

const Drones = ({ timer, target, playSound, difficulty }) => {
  //console.log(drones)
  const group = useRef()
  const drones = useRef(null)
  const wave = useRef(0)
  const player = useRef()

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (drones.current == null) {
      const tempDrones = []
      for (let i = 0; i < droneMap.length; i++) {
        const node = findNodeByName(state.scene, 'enemy-drone-'+i)
        tempDrones.push(node)
      }
      if (tempDrones.length == 5) {
        drones.current = tempDrones
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

      let spawnNumber = wave.current + 1
      drones.current.forEach((drone) => {
        if (drone.health > 0) return
        if (spawnNumber <= 0) return

        drone.health = 100
        drone.visible = true

        drone.position.x = drone.startX
        drone.position.y = drone.startY
        drone.position.z =-8

        spawnNumber -= 1
        //console.log(drone.position.y)
      })
      //console.log(drones.current)

      wave.current += 1
    }
    if (waveTimings[wave.current] < timer.current) spawnWave()
    
  })

  return (
    <group ref={group} position={[0,2,-2]} >
      { droneMap.map( (drone) => (
        <Drone 
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

export default Drones
