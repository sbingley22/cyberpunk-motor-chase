import { useEffect, useRef, useState } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import Game from './components/Game'
import GameOver from './components/GameOver';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    }
  }, [])

  const [mode, setMode] = useState(0)
  const [song, setSong] = useState(0)
  const [runners, setRunners] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [altSkin, setAltSkin] = useState(true)
  const [missionScore, setMissionScore] = useState(0)
  const [difficulty, setDifficulty] = useState(1)  
  const [wordList, setWordList] = useState(-1)
  
  const songYourHouseRef = useRef(null)
  const resistDisorderRef = useRef(null)
  const rebelPathRef = useRef(null)

  // Start Song
  useEffect(()=>{
    const volume = 0.4
    songYourHouseRef.current.currentTime = 0
    songYourHouseRef.current.volume = volume
    songYourHouseRef.current.pause()
    resistDisorderRef.current.currentTime = 0
    resistDisorderRef.current.volume = volume
    resistDisorderRef.current.pause()
    rebelPathRef.current.currentTime = 0
    rebelPathRef.current.volume = volume
    rebelPathRef.current.pause()

    if (song == 0) return
    if (song == 1) songYourHouseRef.current.play()
    else if (song == 2) resistDisorderRef.current.play()
    else if (song == 3) rebelPathRef.current.play()
  }, [song])

  return (
    <>
      { mode == 0 && 
        <MainMenu 
          isMobile={isMobile}
          setMode={setMode}
          song={song}
          setSong={setSong}
          runners={runners}
          setRunners={setRunners}
          missionScore={missionScore}
          setMissionScore={setMissionScore}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          wordList={wordList}
          setWordList={setWordList}
        />
      }
      { mode == 1 && 
        <Game 
          isMobile={isMobile}
          setMode={setMode}
          runners={runners}
          altSkin={altSkin}
          setMissionScore={setMissionScore}
          difficulty={difficulty}
          wordList={wordList}
        />
      }
      { mode == 9 &&
        <GameOver
          isMobile={isMobile}
          setMode={setMode}
          missionScore={missionScore}
        />
      }
      

      <audio ref={songYourHouseRef} loop>
        <source src="./audio/yourHouse.m4a" type="audio/mp4" />
      </audio>
      <audio ref={rebelPathRef} loop>
        <source src="./audio/rebelPath.m4a" type="audio/mp4" />
      </audio>
      <audio ref={resistDisorderRef} loop>
        <source src="./audio/resistDisorder.m4a" type="audio/mp4" />
      </audio>
    </>
  )
}

export default App
