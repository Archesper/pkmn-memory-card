import { useEffect, useRef, useState } from "react";
import { getPokemonCount, getPokemonById } from "../helpers/pokeapi";
import Card from "./Card";
import _ from "lodash";
import timedPromise from "../helpers/timedPromise"
import LoadingScreen from "./loadingScreen";
import ScoreBoard from "./scoreBoard";
import GameOverModal from "./gameOverModal";

export default function Game() {
  const [gameData, setGameData] = useState([]);
  const cards = gameData.map((pokemonData) => (
    <Card
      onClick={(e) => {
        if (clickedItems.current.includes(e.currentTarget.dataset.id)) {
          clickedItems.current = [];
          if (currentScore > bestScore.current) {
            bestScore.current = currentScore;
          }
          setGameState("game_over");
        } else {
          if (currentScore + 1 === gameData.length) {
            setGameState("won");
            clickedItems.current = [];
            bestScore.current = currentScore + 1;
          } else {
            clickedItems.current.push(e.currentTarget.dataset.id);
            const cardContainer = document.querySelector(".cards-container");
            cardContainer.classList.toggle("cards-flipped");
            setCurrentScore(currentScore + 1);
            timedPromise(1000)
            .then(() => cardContainer.classList.toggle("cards-flipped"));
            
            
          }
        }
      }}
      key={pokemonData.id}
      id={pokemonData.id}
      title={pokemonData.name}
      image={pokemonData.sprite}
    ></Card>
  ));
  const cardNodes = useRef(null);
  const clickedItems = useRef([]);
  const [gameState, setGameState] = useState("start");
  const [currentScore, setCurrentScore] = useState(0);
  const bestScore = useRef(0);
  // This effect randomizes card display order on mount and on score change
  useEffect(()=> {
    if (gameState === 'main_loop') {
      if (!cardNodes.current) {
        cardNodes.current = Array.from(document.getElementsByClassName('card'));
      }
      const orders = _.sampleSize(Array.from({length: 12}, (_, index) => index + 1), 12);
      // The use of timedPromise ensures there is no visual lag with the order getting shuffled right before cards flip
      timedPromise(500).then(() => cardNodes.current.forEach((card) => card.style.order = orders.shift()))
      
    }
  }, [currentScore])
  // This effect fetches the pokemon data and starts the game main loop
  useEffect(() => {
    async function fetchData() {
      if (gameState === "loading") {
        const randomIDs = [];
        const count = await getPokemonCount();
        while (randomIDs.length !== 12) {
          const id = Math.floor(Math.random() * parseInt(count)) + 1;
          if (!randomIDs.includes(id)) {
            randomIDs.push(id);
          }
        }
        const asyncGetPokemonById = async (id) => {
          const pokemon_data = await getPokemonById(id);
          const pokemon_data_object = {
            id: pokemon_data.id,
            name: pokemon_data.species.name,
            sprite: pokemon_data.sprites.front_default,
          };
          return pokemon_data_object;
        };
        const requests = randomIDs.map((id) => asyncGetPokemonById(id));
        Promise.all(requests).then((result) => {
          setGameData(result);
          setGameState("main_loop");
        });
      }
    }
    fetchData();
  }, [gameState]);
  if (gameState === "start") {
    return <button onClick={(e) => setGameState("loading")}>Start Game</button>;
  } else if (gameState === "loading") {
    return <LoadingScreen></LoadingScreen>
  } else if (gameState === "main_loop" || gameState === "game_over") {
    return (
      <>
      {gameState === "game_over" ? <GameOverModal finalScore={currentScore} onButtonClick={()=> {setGameState('loading'); setCurrentScore(0)}}> </GameOverModal> : ''}
        <ScoreBoard currentScore={currentScore} bestScore={bestScore.current}></ScoreBoard>
        <div className="cards-container">
          {cards}
        </div>
        
      </>
    );
  } else if (gameState === "won") {
    return <p>Game won!</p>;
  }
}
