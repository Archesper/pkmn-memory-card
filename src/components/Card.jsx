import "../styles/card.css";
import PokeBall from "./pokeball";

export default function Card({
  id,
  title,
  image,
  titleRef,
  imgRef,
  onClick,
  flipped,
}) {
  const classes = "card" + (flipped ? " flipped" : "");
  return (
    <div data-id={id} onClick={onClick} className={classes}>
      <div className="cardFront">
        <img className="sprite" ref={imgRef} src={image}></img>
        <p className="card-title" ref={titleRef}>
          {title}
        </p>
      </div>
      <div className="cardBack">
        <PokeBall></PokeBall>
      </div>
    </div>
  );
}
