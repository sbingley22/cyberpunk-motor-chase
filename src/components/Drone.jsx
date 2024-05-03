/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import Props from "./Props"
import { useFrame } from "@react-three/fiber"
import { Cone } from "@react-three/drei"

const Drone = ({ index, target, player, playSound }) => {
  const ref = useRef()
  const coneRef = useRef()

  const name = "enemy-drone-"+index
  const zRotation = useRef(0)
  const swayDirection = useRef(1)
  const shooting = useRef(false)

  let droneModel = "Drone"
  if (index % 3 == 1) droneModel += "001"
  else if (index % 3 == 2) droneModel += "002"

  useEffect(()=>{
    let startX = -2
    let startY = 3.0
    ref.current.clickX = 1
    ref.current.clickY = 1
    if (index == 1) {
      startX = 2
      startY = 1.5
      ref.current.clickX = 3
      ref.current.clickY = 3
    } else if (index == 2) {
      startX = 2
      startY = 3.0
      ref.current.clickX = 3
      ref.current.clickY = 1
    } else if (index == 3) {
      startX = -2
      startY = 1.5
      ref.current.clickX = 1
      ref.current.clickY = 3
    } else if (index == 4) {
      startX = 0
      startY = 2.25
      ref.current.clickX = 2
      ref.current.clickY = 2
    }
    
    ref.current.position.x = startX
    ref.current.position.y = startY
    ref.current.position.z = 0

    ref.current.startX = startX
    ref.current.startY = startY

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (ref.current.health == -100) return

    const swayRotation = () => {
      const sway = swayDirection.current * delta * 0.1
      zRotation.current += target.current == name ? sway * 10 : sway

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

    const moveForwards = () => {
      if (ref.current.position.z < 0) ref.current.position.z += 4 * delta
    }
    moveForwards()

    const shoot = () => {
      if (shooting.current) {
        // shooting
        player.current.shield -= 4 * delta

      } else {
        // Not currently shooting.
        const chance = Math.random() / delta
        if (chance < 0.12) {
          shooting.current = true
        }
      }
    }
    shoot()

    const targeted = () => {
      if (ref.current.health < 0) return

      shooting.current = false

      ref.current.health -= 20 * delta
      const health = ref.current.health
      if (health <33) coneRef.current.material.color.set(0.7,0.0,0.0)
      else if (health <66) coneRef.current.material.color.set(0.4,0.4,0.0)
      else coneRef.current.material.color.set(0.0,0.7,0.0)

      if (health <= 0) {
        target.current = null
        playSound("kill")
      }
    }
    const notTargeted = () => {
      if (shooting.current) coneRef.current.material.color.set(0,0,1.0)
      else coneRef.current.material.color.set(0.1,0.1,0.1)
    }

    if (target.current == name) targeted()
    else notTargeted()

    const dieing = () => {
      ref.current.position.y -= 2 * delta
      ref.current.position.z -= 2 * delta

      if (ref.current.position.y <= 0) {
        ref.current.health = -100
        ref.current.visible = false
      }
    }
    if (ref.current.health <= 0) dieing()

    //if (target.current == name) console.log("Targetted!", coneRef.current)
  })

  //console.log(droneModel)
  return (
    <group 
      ref={ref} 
      name={name}
      health={-100}
      visible={false}
    >
      <Props name={droneModel} rotation={[Math.PI/2, 0, Math.PI/2]} />
      <Cone
        ref={coneRef}
        args={[.1, 0.3, 3]} // radius, height, segments
        position={[0, .4, 0]}
        rotation={[0, 0, Math.PI]}
        material-color={"grey"}
      />
    </group>
  )
}

export default Drone
