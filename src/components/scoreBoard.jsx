import '../styles/scoreBoard.css'

export default function ScoreBoard({currentScore, bestScore}) {
  return (
    <div className="score-board">
      <p>Score: <span className="score">{currentScore}</span></p>
      <p>High Score: <span className="score">{bestScore}</span></p>
    </div> 
  );
}