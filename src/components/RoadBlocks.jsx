/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"
import { useFrame } from "@react-three/fiber"

const loopDist = 90

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

const RoadBlocks = ({ speed }) => {
  const group = useRef()
  const player = useRef(null)

  useFrame((state, delta)=>{
    if (!group.current) return
    if (!player.current) {
      player.current = findNodeByName(state.scene, "player")
      return
    }

    group.current.children.forEach((prop)=>{
      prop.position.z -= delta * speed.current

      if (prop.position.z < 1 && prop.position.z > 0) {
        const width = 1.5
        let playerZone = 1
        if (player.current.position.x < -width) playerZone = 0
        else if (player.current.position.x > width) playerZone = 2

        let playerHit = false
        if (prop.position.x < -width && playerZone == 0) playerHit = true
        else if (prop.position.x > width && playerZone == 2) playerHit = true
        else if (prop.position.x > -width && prop.position.x < width && playerZone == 1) playerHit = true

        if (playerHit) {
          //console.log(playerZone, prop.position.x)
          prop.position.z = -100
          player.current.roadBlockFlag = true
        }

      }

      if (prop.position.z < -loopDist) {
        //Respawn Prop
        const zPos = Math.random() * loopDist
        prop.position.z = loopDist + zPos
      }
    })
  })
  
  return (
    <>
      <group ref={group}>
        <Props name={"Car"} position={[2.5,0,100]} matRoughness={0.9} />
        <Props name={"RoadBlock"} position={[0,0,-30]} matRoughness={0.9} />
        <Props name={"RoadBlock2"} position={[-2.5,0,-50]} scale-z={2} rotation-y={Math.PI/2} matRoughness={0.9} />
      </group>
    </>
  )
}

export default RoadBlocks
