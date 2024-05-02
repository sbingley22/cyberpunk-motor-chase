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

  const audioGunshot = useRef(null)
  const audioPlayerHit = useRef(null)
  const audioEnemyHit = useRef(null)
  const audioReload = useRef(null)
  const audioShieldHit = useRef(null)
  const audioKill = useRef(null)

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
            <PerspectiveCamera ref={cam1} name="frontCam" makeDefault position={[0,2,-2.5]} fov={110} />
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
            <PerspectiveCamera ref={cam2} name="rearCam" makeDefault position={[0,2,2.5]} fov={55} />
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
      
      
      <audio ref={audioGunshot} >
        <source src="./audio/gunshot.wav" type="audio/wav" />
      </audio>
      <audio ref={audioKill} >
        <source src="./audio/kill.m4a" type="audio/wav" />
      </audio>
      <audio ref={audioPlayerHit} >
        <source src="./audio/playerHit.wav" type="audio/wav" />
      </audio>
      <audio ref={audioEnemyHit} >
        <source src="./audio/enemyHit.wav" type="audio/wav" />
      </audio>
      <audio ref={audioReload} >
        <source src="./audio/reload.wav" type="audio/wav" />
      </audio>
      <audio ref={audioShieldHit} >
        <source src="./audio/shieldHit.wav" type="audio/wav" />
      </audio>
    </div>
  )
}

export default Game
