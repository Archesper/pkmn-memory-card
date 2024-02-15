import "../styles/card.css";
import { useEffect, useRef } from "react";
import _ from "lodash";
import timedPromise from "../helpers/timedPromise";

export default function CardContainer({ gameState, children }) {
  const cardNodes = useRef(null);
  // This effect shuffles cards ( using flexbox order property)
  // It runs after every render - the cards onclick ( set in game component ) re-renders parent component
  useEffect(() => {
    if (gameState === "main_loop") {
      if (!cardNodes.current) {
        cardNodes.current = Array.from(document.getElementsByClassName("card"));
      }
      // The shuffling logic is wrapped in an else as not to shuffle the cards on first render, to avoid making it look
      // Like the cards display twice
      else {
        const orders = _.sampleSize(
          Array.from({ length: 12 }, (_, index) => index + 1),
          12
        );
        // The use of timedPromise ensures there is no visual lag with the order getting shuffled right before cards flip
        timedPromise(500).then(() =>
          cardNodes.current.forEach(
            (card) => (card.style.order = orders.shift())
          )
        );
      }
    }
  });
  return <div className="cards-container">{children}</div>;
}
