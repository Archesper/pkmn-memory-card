import './styles/card.css'

export default function Card({title, image, titleRef, imgRef}) {
  return (
    <div className="card">
      <div className="cardFront">
        <img className="sprite" ref={imgRef} src={image}></img>
        <p className="card-title" ref={titleRef}>{title}</p>
      </div>
      <div className="cardBack"><div className="card-ball"></div></div>
    </div>
  )
}