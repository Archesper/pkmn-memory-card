import "../styles/gameOverModal.css";
import PokeBall from "./pokeball";
import gameLostGif from "../assets/game-lost-gif.gif";
import gameWonGif from "../assets/game-won-gif.gif";
import pokeBallIcon from "../assets/poke_ball.svg";

const nextDifficultyMap = {
  easy: "medium",
  medium: "hard",
  hard: "hard",
};

export default function GameOverModal({
  onButtonClick,
  finalScore,
  winOrLose,
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="game-over">
      <div className="game-over-popup">
        {winOrLose === "WIN" ? (
          <h2 className="game-over-title">You win!</h2>
        ) : (
          <h2 className="game-over-title">
            Game <img className="poke-ball-icon" src={pokeBallIcon} /> ver!
          </h2>
        )}
        <img
          className="game-over-gif"
          src={winOrLose === "WIN" ? gameWonGif : gameLostGif}
          alt="Pikachu using thunderbolt"
        />
        <p>Your final score is: {finalScore}!</p>
        <button onClick={onButtonClick} className="play-again-btn">
          Play Again
        </button>
        {winOrLose === "WIN" && (
          <button
            onClick={() => {
              setDifficulty(nextDifficultyMap[difficulty]);
              onButtonClick();
            }}
            className="play-again-btn"
          >
            Next Difficulty
          </button>
        )}
      </div>
    </div>
  );
}
