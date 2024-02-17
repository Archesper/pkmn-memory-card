import RadioInput from "./radioInput"
import "../styles/startMenu.css"

export default function StartMenu({ onStart, onRadioChange }) {
  return (
    <div className="start-menu">
      <h1>Choose a difficulty:</h1>
      <RadioInput onChange={onRadioChange} options={['easy', 'medium', 'hard']}></RadioInput>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
}
