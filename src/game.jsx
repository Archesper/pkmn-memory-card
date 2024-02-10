import { useEffect, useRef, useState } from "react";
import { getPokemonCount, getPokemonById } from "./pokeapi";
import Card from "./card";
import _ from "lodash";

export default function Game() {
  const [gameData, setGameData] = useState([]);
  const cards = gameData.map((pokemonData) => (
    <Card
      onClick={(e) => {if (clickedItems.current.includes(e.currentTarget.dataset.id)) {
        clickedItems.current = [];
        if (currentScore > bestScore.current) {
          bestScore.current = currentScore;
        }
        setCurrentScore(0);
      }else {
        if (currentScore + 1 === gameData.length) {
          setGameState('won');
          clickedItems.current = [];
          bestScore.current = currentScore + 1;
        } else {
          clickedItems.current.push(e.currentTarget.dataset.id);
          setCurrentScore(currentScore + 1);
        }
        
      }}}
      key={pokemonData.id}
      id = {pokemonData.id}
      title={pokemonData.name}
      image={pokemonData.sprite}
    ></Card>
  ));
  const clickedItems = useRef([]);
  const [gameState, setGameState] = useState("start");
  const [currentScore, setCurrentScore] = useState(0);
  const bestScore = useRef(0);
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
            name: pokemon_data.name,
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
    return <p>Loading...</p>;
  } else if (gameState === "main_loop") {
    return (
      <>
        <p>Current score: {currentScore}</p>
        <p>Best score: {bestScore.current}</p>
        <div>{_.sampleSize(cards, cards.length)}</div>
      </>
    );
  } else if (gameState === 'won') {
    return (
      <p>Game won!</p>
    );
  }
}
