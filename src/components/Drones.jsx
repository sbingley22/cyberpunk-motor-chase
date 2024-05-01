/* eslint-disable react/no-unknown-property */
import { useRef } from "react"
import Drone from "./Drone"

const drones = [0,1,2,3,4]

const Drones = () => {
  //console.log(drones)

  return (
    <group position={[0,2,-2]} >
      { drones.map( (drone) => (
        <Drone key={"enemy-drone-"+drone} index={drone} />
      )) }
    </group>
  )
}

export default Drones
