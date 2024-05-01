/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"
import { useFrame } from "@react-three/fiber"

const Drone = ({ index }) => {
  const ref = useRef()
  const name = "enemy-drone-"+index
  const zRotation = useRef(0)
  const swayDirection = useRef(1)

  let droneModel = "Drone"
  if (index % 3 == 1) droneModel += "001"
  else if (index % 3 == 2) droneModel += "002"

  const handleClick = () => {
    console.log(name)
  }

  // eslint-disable-next-line no-unused-vars
  useFrame((state,delta) => {
    const swayRotation = () => {
      const sway = swayDirection.current * delta * 0.1
      zRotation.current += sway

      const swayLimit = 0.1
      if (zRotation.current > swayLimit) {
        zRotation.current = swayLimit
        swayDirection.current = -1
      } else if (zRotation.current < -swayLimit) {
        zRotation.current = -swayLimit
        swayDirection.current = 1
      }

      ref.current.rotation.z = zRotation.current
    }
    swayRotation()
  })

  //console.log(droneModel)
  return (
    <group 
      ref={ref} 
      name={name}
      health={-1}
      visible={false}
      onClick={handleClick}
    >
      <Props name={droneModel} rotation={[Math.PI/2, 0, Math.PI/2]} />
    </group>
  )
}

export default Drone
