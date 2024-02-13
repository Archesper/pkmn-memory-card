import './styles/pokeball.css'

export default function PokeBall() {
  return (
    <div className="card-ball">
      <div className="ball-center">
        <div className="inner-ring"></div>
      </div>
      <div className="ball-strikethrough"></div>
      <div className="ball-lower-half"></div>
    </div>
  );
}
