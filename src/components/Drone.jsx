/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"

const Drone = ({ index }) => {
  const ref = useRef()
  const name = "enemy-drone-"+index
  let droneModel = "Drone"
  if (index % 3 == 1) droneModel += "001"
  else if (index % 3 == 2) droneModel += "002"

  //console.log(droneModel)
  return (
    <group ref={ref} name={name}>
      <Props name={droneModel} />
    </group>
  )
}

export default Drone
