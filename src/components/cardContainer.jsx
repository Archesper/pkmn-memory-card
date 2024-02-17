import "../styles/card.css";
import { useEffect, useRef } from "react";
import _ from "lodash";
import Card from "./Card";
import timedPromise from "../helpers/timedPromise";

export default function CardContainer({gameState, gameData, onCardClick }) {
  const cards = gameData.map((pokemonData) => (
    <Card
      onClick={onCardClick}
      key={pokemonData.id}
      id={pokemonData.id}
      title={pokemonData.name}
      image={pokemonData.sprite}
    ></Card>
  ));
  const cardNodes = useRef(null);
  const switchCard = (cardNode, newData) => {
    const sprite = cardNode.querySelector('.sprite');
    const title = cardNode.querySelector('.card-title');
    sprite.src = newData.sprite;
    title.textContent = newData.name;
    cardNode.dataset.id = newData.id;
  }
  const classes = "cards-container " + (gameState === "game_won" || gameState === "game_lost" ? "cards-flipped" : "");
  // This effect shuffles cards by changing the existing DOM nodes attributes
  // This method was preferred to flex order to allow to have more cards in data than cards currently displayed
  // It was also preferred to other methods that involved re-rendering the cards as that caused visual lag with
  // the card flipping animation
  // It runs after every render - the cards onclick ( set in game component ) re-renders parent component
  useEffect(() => {
    if (gameState === "main_loop") {
      if (!cardNodes.current) {
        cardNodes.current = Array.from(document.getElementsByClassName("card"));
      }
      // The shuffling logic is wrapped in an else as not to shuffle the cards on first render, to avoid making it look
      // Like the cards display twice
      else {
        const randomPokemon = _.sampleSize(gameData, gameData.length);
        // The use of timedPromise ensures there is no visual lag with the order getting shuffled right before cards flip
        timedPromise(500).then(() =>
          cardNodes.current.forEach(
            (card) => (switchCard(card, randomPokemon.shift()))
          )
        );
      }
    }
  });
  return <div className={classes}>{cards}</div>;
}
