/* eslint-disable react/prop-types */

const GameOver = ({ isMobile, missionScore, setMode }) => {
  const menuStyle = {
    boxSizing: "border-box",
    display: isMobile ? "block" : "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 3fr 1fr",
    gridTemplateRows: isMobile ? "1fr" : "1fr",
    padding: "10px",
    width: "100vw",
    height: "100vh",
    backgroundImage: "url(./stills/menuStill.png)",
    userSelect: "none",
    textAlign: isMobile ? "left" : "center"
  }

  return (
    <div className="background-image" style={menuStyle}>
      <div>
        <h1>Mission Over</h1>
      </div>
      <div>
        <h3>Score: </h3>
        <h3>{missionScore}</h3>
      </div>
      <div>
        <button onClick={()=>setMode(0)}>Return</button>
      </div>
    </div>
  )
}

export default GameOver
