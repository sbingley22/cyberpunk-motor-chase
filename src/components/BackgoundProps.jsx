/* eslint-disable react/prop-types */
import { useRef } from "react"
import Props from "./Props"
import { useFrame } from "@react-three/fiber"
import { Plane } from "@react-three/drei"

const loopDist = 400

const BackgoundProps = ({ speed }) => {
  const group = useRef()

  useFrame((state, delta)=>{
    if (!group.current) return

    group.current.children.forEach((prop)=>{
      prop.position.z -= delta * speed.current
      if (prop.position.z < -loopDist) prop.position.z = loopDist
    })
  })
  
  return (
    <>
      <group ref={group}>
        <Props name={"building"} position={[25,-7,loopDist]} scale={100} rotation={[Math.PI/2, 0, 0]} matRoughness={0.9} />
        <Props name={"building001"} position={[-20,-9,-20]} scale={50} rotation={[0, 0, 0]} matRoughness={0.9} />
      </group>
      <Plane position-y={-5} scale={[50,400, 1]} rotation-x={-Math.PI/2} material-color={"#443333"} />
    </>
  )
}

export default BackgoundProps
