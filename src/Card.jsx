import "./styles/card.css";

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
        <div className="card-ball">
          <div className="ball-center">
            <div className="inner-ring"></div>
          </div>
          <div className="ball-strikethrough"></div>
          <div className="ball-lower-half"></div>
        </div>

      </div>
    </div>
  );
}
