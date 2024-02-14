import "../styles/gameOverModal.css";
import PokeBall from "./pokeball";
import gameOverGif from "../assets/game-over-gif.gif";
import pokeBallIcon from "../assets/poke_ball.svg"

export default function GameOverModal({onButtonClick, finalScore}) {
  return (
    <div className="game-over">
      <div className="game-over-popup">
        <h1 className="game-over-title">Game <img className="poke-ball-icon" src={pokeBallIcon}/> ver!</h1>
        <img className="game-over-gif" src={gameOverGif} alt="Pikachu using thunderbolt"/>
        <p>Your final score is: {finalScore}!</p>
        <button onClick={onButtonClick} className="play-again-btn">Play Again</button>
      </div>
    </div>
  );
}
