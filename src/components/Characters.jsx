/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useSkinnedMeshClone } from './SkinnedMeshClone'
import { useEffect } from 'react'
import gltfFile from '../assets/Players.glb?url'
import { useFrame } from '@react-three/fiber'

const characterNodes = [
  ["Adam", "LowTopo_Cube002", "LowTopo_Cube002_1", "LowTopo_Cube002_2", "CyberHiTops", "Jacket", "Mowhawk", "MotorCycle", "Pistol"],
  ["Ana", "LowTopo_Cube001", "LowTopo_Cube001_1", "MotorCycle", "Pistol", "Parted", "JacketLucy", "LowTopo_Cube004", "LowTopo_Cube004_1"],
  ["Ana", "LowTopo_Cube001", "LowTopo_Cube001_1", "CyberHiTops", "CyberCannon", "Cube003", "Cube003_1", "CyberArms", "MotorCycle", "JacketRebbeca", "PigTails"],
  ["AnaGen", "MotorCycle", "Pistol", "Parted", "JacketLucy"],
  ["AnaGen", "CyberHiTops", "CyberCannon", "Cube003", "Cube003_1", "CyberArms", "MotorCycle", "JacketRebbecaShort", "PigTails"],
  ["MotorCycle", "Merc1", "Pistol"],
  ["MotorCycle", "Merc2", "Pistol"]
]

const Characters = ({ character, altSkin=false, anim, lastAnim }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(gltfFile)
  const { actions, mixer } = useAnimations(animations, scene)

  // Character Setup
  useEffect(()=>{
    //console.log(nodes)
    Object.keys(nodes).forEach(nodeKey => {
      const node = nodes[nodeKey]
      if (node.type == "SkinnedMesh") {
        node.castShadow = true
        node.frustumCulled = false
        node.visible = false
      }
    })

    let char = character
    if (altSkin) {
      if (char == 1) char += 2
      else if (char == 2) char += 2
    }
    characterNodes[char].forEach((nodeName) => {
      const node = nodes[nodeName]
      node.visible = true
    })

    if (char == 2) {
      nodes["Ana"].children[0].material = nodes["AnaGen"].material
      nodes["Ana"].children[1].material = nodes["AnaGen"].material
    } else if (char == 3) {
      nodes["AnaGen"].material = nodes["Ana"].children[0].material
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes])

  // Mixer
  useEffect(()=>{
    actions["hurt"].repetitions = 1
    actions["hurt"].clampWhenFinished = false
    actions["drivingHurt"].repetitions = 1
    actions["drivingHurt"].clampWhenFinished = true
    actions["shootingHurt"].repetitions = 1
    actions["shootingHurt"].clampWhenFinished = true

    mixer.addEventListener('finished', () => {
      if (anim.current == "shootingHurt") anim.current = "aiming"
      else if (anim.current == "drivingHurt") anim.current = "aiming"
    })

    return () => {
      mixer.removeEventListener('finished')
    }
  }, [mixer, actions, anim])

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {

    const updateAnimations = () => {
      //if (character == 5) console.log(anim.current, lastAnim.current)
      if (lastAnim.current == anim.current) return

      actions[lastAnim.current].fadeOut(0.1)
      actions[anim.current].reset().fadeIn(0.1).play()

      lastAnim.current = anim.current
    }
    updateAnimations()
    
  })

  return (
    <>
      <primitive object={scene} dispose={null} />
    </>
  )
}

export default Characters

useGLTF.preload(gltfFile)