/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef } from "react"
import Characters from "./Characters"
import { useFrame } from "@react-three/fiber"
import { Html, useKeyboardControls } from "@react-three/drei"

const Player = ({ runners, altSkin, cam, frontClick, timer, target }) => {
  const groupRef = useRef()
  const anim = useRef("driving")
  const lastAnim = useRef("drivingLeft")
  const [, getKeys] = useKeyboardControls()
  
  const hullDmgRef = useRef()

  const newAnimation = (newAnim) => {
    anim.current = newAnim
  }

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    const { gas, breaks, clutch, left, right, aKey, dKey, engine } = getKeys()

    const steering = () => {
      let steerLeft = false
      let steerRight = false

      if (left) steerLeft = true
      else if (right) steerRight = true
      if (clutch && aKey) steerLeft = true
      else if (clutch && dKey) steerRight = true

      if (frontClick.current == -1) steerLeft = true
      else if (frontClick.current == 1) steerRight = true

      const turnSpeed = 4
      const roadWidth = 2.5
      if (steerLeft) {
        groupRef.current.position.x += turnSpeed * delta
        if (groupRef.current.position.x > roadWidth) groupRef.current.position.x = roadWidth
        newAnimation("drivingLeft")
      }
      else if (steerRight) {
        groupRef.current.position.x -= turnSpeed * delta
        if (groupRef.current.position.x < -roadWidth) groupRef.current.position.x = -roadWidth
        newAnimation("drivingRight")
      }
      else {
        newAnimation("driving")
      }
    }
    steering()

    const shooting = () => {
      if (target.current) {
        newAnimation("shooting")
      }
    }
    shooting()

    const updateCam = () => {
      if (!cam.current.name) return
      if (cam.current.name == "frontCam") {
        cam.current.position.x = groupRef.current.position.x * 0.5
      }
      else if (cam.current.name == "rearCam") {
        cam.current.position.x = groupRef.current.position.x * 0.05
      }
    }
    updateCam()

    const updateHud = () => {
      if (!hullDmgRef.current) return
      if (!groupRef.current) return

      if (cam.current.name == "frontCam") hullDmgRef.current.innerHTML = "Hull: " + groupRef.current.hull
    }
    updateHud()

  })

  return (
    <>
      <group 
        ref={groupRef}
        shield={100}
        hull={100}
      >
        <Characters character={runners} altSkin={altSkin} anim={anim} lastAnim={lastAnim} />
        <Html>
          <p ref={hullDmgRef}></p>
        </Html>
      </group>
    </>
  )
}

export default Player
