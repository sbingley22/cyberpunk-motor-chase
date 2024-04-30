/* eslint-disable react/prop-types */

const MainMenu = ({ setMode, song, setSong, runners, setRunners, difficulty, setDifficulty, wordList, setWordList }) => {
  const menuStyle = {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    padding: "10px",
    height: "100vh",
    backgroundImage: "url(./stills/menuStill.png)",
    userSelect: "none"
  }

  const handleSongChange = (event) => {
    setSong(parseInt(event.target.value))
  }

  const handleRunnersChange = (event) => {
    setRunners(parseInt(event.target.value))
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value))
  }

  const handleWordsChange = (event) => {
    setWordList(parseInt(event.target.value))
  }

  return (
    <div className="background-image" style={menuStyle}>
      <div>
        <h1>CyberPunk EdgeRunners MotorChase</h1>
      </div>
      <div>
        <button 
          onClick={()=>setMode(1)}
          style={{
            marginTop: "5vh",
            fontSize: "x-large"
          }}
        >
          Play
        </button>
      </div>
      <div style={{marginTop: "3vh"}}>
        <div>
          <h5>Runners:</h5>
          <label>
            <input type="radio" value={0} checked={runners === 0} onChange={handleRunnersChange} />
            David Martinez
          </label>
          <label>
            <input type="radio" value={1} checked={runners === 1} onChange={handleRunnersChange} />
            Lucy Kushinada
          </label>
          <label>
            <input type="radio" value={2} checked={runners === 2} onChange={handleRunnersChange} />
            Rebecca
          </label>
        </div>

        <div>
          <h5>Radio:</h5>
          <label>
            <input type="radio" value={0} checked={song === 0} onChange={handleSongChange} />
            No music
          </label>
          <label>
            <input type="radio" value={1} checked={song === 1} onChange={handleSongChange} />
            Stay at your house
          </label>
          <label>
            <input type="radio" value={2} checked={song === 2} onChange={handleSongChange} />
            Resist and Disorder
          </label>
          <label>
            <input type="radio" value={3} checked={song === 3} onChange={handleSongChange} />
            Rebel Path
          </label>
        </div>
        
        <div>
          <h5>Difficulty:</h5>
          <label>
            <input type="radio" value={0} checked={difficulty === 0} onChange={handleDifficultyChange} />
            Easy
          </label>
          <label>
            <input type="radio" value={1} checked={difficulty === 1} onChange={handleDifficultyChange} />
            Normal
          </label>
          <label>
            <input type="radio" value={2} checked={difficulty === 2} onChange={handleDifficultyChange} />
            Hard
          </label>
        </div>
        
        <div>
          <h5>Word List:</h5>
          <label>
            <input type="radio" value={0} checked={wordList === 0} onChange={handleWordsChange} />
            Cyberpunk
          </label>
          <label>
            <input type="radio" value={1} checked={wordList === 1} onChange={handleWordsChange} />
            Coding
          </label>
          <label>
            <input type="radio" value={2} checked={wordList === 2} onChange={handleWordsChange} />
            Left Handed
          </label>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
