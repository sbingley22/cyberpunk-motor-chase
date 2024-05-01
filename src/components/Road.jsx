/* eslint-disable react/prop-types */
import { useFrame } from "@react-three/fiber"
import Props from "./Props"
import { useRef } from "react"

const Road = ({ speed }) => {
  const ref = useRef()
  const name = "GroundRoad"

  // eslint-disable-next-line no-unused-vars
  useFrame((state,delta) => {
    if (!ref) return

    const repeatPos = 5
    ref.current.position.z -= speed.current * delta
    if (ref.current.position.z < -repeatPos) ref.current.position.z += repeatPos * 2

    //console.log(ref.current.position.z, speed)
  })

  return (
    <group ref={ref}>
      <Props 
        name={name} 
        scale={[1,1,20]}
        matUV={[1,20]}
        matRoughness={0.8}
        matColor={[0.2,0.2,0.2]}
      />
    </group>
  )
}

export default Road
