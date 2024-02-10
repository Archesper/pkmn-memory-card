import './styles/card.css'

export default function Card({id, title, image, titleRef, imgRef, onClick}) {
  return (
    <div data-id={id} onClick={onClick} className="card">
      <div className="cardFront">
        <img className="sprite" ref={imgRef} src={image}></img>
        <p className="card-title" ref={titleRef}>{title}</p>
      </div>
      <div className="cardBack"><div className="card-ball"></div></div>
    </div>
  )
}