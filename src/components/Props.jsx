/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useGLTF } from '@react-three/drei'
import gltfFile from '../assets/Props.glb?url'
import { Vector2 } from 'three'

const Props = ({ 
  name, 
  matUV=[0,1],
  matRoughness=-0.5, 
  matColor=[-1,-1,-1], 
  ...props 
}) => {
  const { nodes } = useGLTF(gltfFile)
  const node = nodes[name]
  //console.log(nodes)
  //console.log(node, name)
  //console.log(node.material)

  if (matUV[0] != 0) {
    const newUv = new Vector2(...matUV)
    node.material.map.repeat = newUv
  }
  if (matRoughness != -0.5) node.material.roughness = matRoughness
  if (matColor[0] != -1) node.material.color.set(...matColor)
  
  return (
    <group {...props}>      
      <mesh geometry={node.geometry} material={node.material} />
    </group>
  )
}

export default Props

useGLTF.preload(gltfFile)