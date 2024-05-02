/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"
import { Cone } from "@react-three/drei"

const Drone = ({ index }) => {
  const ref = useRef()
  const coneRef = useRef()
  const name = "enemy-drone-"+index
  let droneModel = "Drone"
  if (index % 3 == 1) droneModel += "001"
  else if (index % 3 == 2) droneModel += "002"

  //console.log(droneModel)
  return (
    <group ref={ref} name={name}>
      <Props name={droneModel}/>
      <Cone
        ref={coneRef}
        args={[.1, 0.3, 3]} // radius, height, segments
        position={[0, .4, 0]}
        rotation={[0, 0, Math.PI]}
        material-color={"red"}
      />
    </group>
  )
}

export default Drone
