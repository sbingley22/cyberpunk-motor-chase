/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cone } from "@react-three/drei"
import Characters from "./Characters"

const Merc = ({ index, target, player, playSound, difficulty }) => {
  const ref = useRef()
  const coneRef = useRef()

  const anim = useRef("driving")
  const lastAnim = useRef("drivingLeft")

  const name = "enemy-merc-"+index
  const shooting = useRef(false)

  let mercModel = 5
  if (index == 1) mercModel = 6

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (ref.current.health == -100) return

    const moveForwards = () => {
      if (ref.current.position.z < 0) ref.current.position.z += 4 * delta
    }
    moveForwards()

    const shoot = () => {
      if (shooting.current) {
        // shooting
        const dmg = difficulty == 0 ? 0.5 : difficulty == 1 ? 1 : 2
        player.current.shield -= dmg * delta
        anim.current = "shootingForward"
      } else {
        // Not currently shooting.
        anim.current = "driving"
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

      anim.current = "drivingHurt"

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

    //console.log(anim.current, lastAnim.current)
  })
  
  return (
    <group 
      ref={ref} 
      name={name}
      health={-100}
      visible={false}
      position-x={index == 0 ? -2.5 : 2.5}
    >
      <Characters 
        character={mercModel}
        anim={anim} 
        lastAnim={lastAnim} 
      />
      <Cone
        ref={coneRef}
        args={[.1, 0.3, 3]} // radius, height, segments
        position={[0, 1.9, 0]}
        rotation={[0, 0, Math.PI]}
        material-color={"grey"}
      />
    </group>
  )
}

export default Merc
