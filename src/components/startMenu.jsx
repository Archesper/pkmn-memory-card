import RadioInput from "./radioInput"
import "../styles/startMenu.css"

export default function StartMenu({ onStart }) {
  return (
    <div className="start-menu">
      <h1>Choose a difficulty:</h1>
      <RadioInput options={['easy', 'medium', 'hard']}></RadioInput>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
}
