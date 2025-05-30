/* eslint-disable react/prop-types */
import { KeyboardControls, PerspectiveCamera, View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"
import { Suspense, useRef } from "react"


const Game = ({ isMobile, setMode, runners, altSkin, setMissionScore, difficulty, wordList }) => {
  const cam1 = useRef()
  const cam2 = useRef()

  const frontClick = useRef(0)
  const backClick = useRef(0)

  const handleViewFrontClickDown = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - boundingRect.left) / boundingRect.width;
    //const y = (e.clientY - boundingRect.top) / boundingRect.height;

    if (x < 0.5) frontClick.current = -1
    else frontClick.current = 1

    //console.log(e)
    //console.log('Clicked at:', { x, y });
  }

  const handleViewFrontClickUp = () => {
    frontClick.current = 0
  }

  const handleViewBackClickDown = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - boundingRect.left) / boundingRect.width;
    const y = (e.clientY - boundingRect.top) / boundingRect.height;

    backClick.current = [x,y]
  }
  const handleViewBackClickUp = () => {
    backClick.current = [-1,-1]
  }
  
  return (
    <div 
      className="container" 
      onContextMenu={(e)=>e.preventDefault()}
      //onTouchMove={(e)=>e.preventDefault()}
    >
      <KeyboardControls
        map={[
        { name: "gas", keys: ["ArrowUp"] },
        { name: "brakes", keys: ["ArrowDown"] },
        { name: "left", keys: ["ArrowLeft"] },
        { name: "right", keys: ["ArrowRight"] },
        { name: "aKey", keys: ["a", "A"] },
        { name: "dKey", keys: ["d", "D"] },
        { name: "clutch", keys: ["Space"] },
        { name: "engine", keys: ["Tab", "Enter"] },
        ]}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas 
            className="canvas"
            shadows
            dpr={isMobile ? 0.5 : 2}
          >
            <View.Port />
          </Canvas>
          <View
            onPointerDown={handleViewFrontClickDown}
            onPointerUp={handleViewFrontClickUp}
          >
            <PerspectiveCamera ref={cam1} name="frontCam" makeDefault position={[0,2,-2.5]} fov={90} />
            <Scene 
              isMobile={isMobile}
              name={"front"}
              cam={cam1}
              setMode={setMode}
              runners={runners}
              altSkin={altSkin}
              setMissionScore={setMissionScore}
              difficulty={difficulty}
              wordList={wordList}
              frontClick={frontClick}
              backClick={backClick}
            />
          </View>
          <View 
            onPointerDown={handleViewBackClickDown}
            onPointerUp={handleViewBackClickUp}
          >
            <PerspectiveCamera ref={cam2} name="rearCam" makeDefault position={[0,3,5.5]} fov={60} />
            <Scene 
              isMobile={isMobile} 
              name={"rear"}
              cam={cam2}
              setMode={setMode}
              runners={runners}
              setMissionScore={setMissionScore}
              difficulty={difficulty}
              wordList={wordList}
              frontClick={frontClick}
              backClick={backClick}
            />
          </View>
        </Suspense>
      </KeyboardControls>
      
    </div>
  )
}

export default Game
