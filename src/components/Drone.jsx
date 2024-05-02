/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"
import { useFrame } from "@react-three/fiber"
import { Cone } from "@react-three/drei"

const Drone = ({ index }) => {
  const ref = useRef()
  const coneRef = useRef()
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
