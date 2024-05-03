/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef } from "react"
import Characters from "./Characters"
import { useFrame } from "@react-three/fiber"
import { Html, Plane, useKeyboardControls } from "@react-three/drei"

const Player = ({ runners, altSkin, cam, frontClick, timer, target, setMode, setMissionScore, playSound, stopSound }) => {
  const groupRef = useRef()
  const anim = useRef("driving")
  const lastAnim = useRef("drivingLeft")
  const [, getKeys] = useKeyboardControls()
  
  const hullDmgRef = useRef()
  const shieldPlaneRef = useRef()
  const prevShield = useRef(100)
  const roadPlaneRef = useRef()
  const roadTime = useRef(0)

  const newAnimation = (newAnim) => {
    if (anim.current == "hurt") return
    if (anim.current == "drivingHurt") return
    if (anim.current == "shootingHurt") return

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
        playSound("enemyHit")
      } else {
        stopSound("enemyHit")
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

    const gameOver = (win=false) => {
      let score = 0
      if (win) score += 200
      score += groupRef.current.shield
      score += groupRef.current.hull * 11
      score += Math.floor(timer.current)

      setMissionScore(Math.floor(score))
      setMode(9)
    }

    const updateHud = () => {
      if (!hullDmgRef.current) return
      if (!shieldPlaneRef.current) return
      if (!roadPlaneRef.current) return
      if (!groupRef.current) return

      if (groupRef.current.shield < 0) {
        groupRef.current.shield = 0
        gameOver()
      }

      if (cam.current.name == "frontCam") hullDmgRef.current.innerHTML = groupRef.current.hull + "/9"
      if (cam.current.name == "rearCam") shieldPlaneRef.current.scale.x = groupRef.current.shield * .03

      roadTime.current += delta
      roadPlaneRef.current.scale.x = ( roadTime.current / 180 ) * 2
      if (roadTime.current >= 180) {
        gameOver(true)
      }
    }
    updateHud()

    const updateShields = () => {
      if (prevShield.current != groupRef.current.shield) {
        prevShield.current = groupRef.current.shield
        playSound("shieldHit")
        newAnimation("shootingHurt")
      } else {
        stopSound("shieldHit")
      }
    }
    updateShields()

    const hitRoadBlock = () => {
      groupRef.current.roadBlockFlag = false
      newAnimation("drivingHurt")
      playSound("roadHit")
      groupRef.current.hull -= 1
      if (groupRef.current.hull <= 0) gameOver()
    }
    if (groupRef.current.roadBlockFlag) hitRoadBlock()

  })

  return (
    <>
      <group 
        ref={groupRef}
        name="player"
        shield={100}
        hull={9}
        roadBlockFlag={false}
      >
        <Characters 
          character={runners} 
          altSkin={altSkin} 
          anim={anim} 
          lastAnim={lastAnim} 
        />

        <Html position={[0, -0.05, 0]}>
          <p ref={hullDmgRef} style={{fontWeight: "bold"}}></p>
        </Html>

        <Plane 
          position={[0,0.25,2]}
          scale={[3,.5,1]}
          material-color={"#222222"}
        />
        <Plane 
          ref={shieldPlaneRef}
          position={[0,0.25,2.1]}
          scale={[3,.5,1]}
          material-color={"#222299"}
        />
        
        <Plane 
          position={[0,0.25,-.7]}
          scale={[2,.05,1]}
          rotation={[0, Math.PI, 0]}
          material-color={"#222222"}
        />
        <Plane 
          ref={roadPlaneRef}
          position={[0,0.25,-.71]}
          scale={[0,.05,1]}
          rotation={[0, Math.PI, 0]}
          material-color={"#992299"}
        />
      </group>
    </>
  )
}

export default Player
