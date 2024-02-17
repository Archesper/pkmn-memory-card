import { useEffect, useRef, useState } from "react";
import { getPokemonCount, getPokemonById } from "../helpers/pokeapi";
import Card from "./Card";
import timedPromise from "../helpers/timedPromise";
import LoadingScreen from "./loadingScreen";
import ScoreBoard from "./scoreBoard";
import GameOverModal from "./gameOverModal";
import CardContainer from "./cardContainer";
import StartMenu from "./startMenu";

const fetchCounts = {
  easy: 5,
  medium: 12,
  hard: 30
}

export default function Game() {
  const [gameData, setGameData] = useState([]);
  const [gameDifficulty, setGameDifficulty] = useState('');
  const clickedItems = useRef([]);
  const [gameState, setGameState] = useState("start");
  const [currentScore, setCurrentScore] = useState(0);
  const bestScore = useRef(0);
  const cardClick = (e) => {
    if (clickedItems.current.includes(e.currentTarget.dataset.id)) {
      clickedItems.current = [];
      if (currentScore > bestScore.current) {
        bestScore.current = currentScore;
      }
      setGameState("game_lost");
    } else {
      if (currentScore + 1 === gameData.length) {
        setGameState("game_won");
        setCurrentScore(currentScore + 1);
        clickedItems.current = [];
        bestScore.current = currentScore + 1;
      } else {
        clickedItems.current.push(e.currentTarget.dataset.id);
        const cardContainer = document.querySelector(".cards-container");
        cardContainer.classList.toggle("cards-flipped");
        setCurrentScore(currentScore + 1);
        timedPromise(1000).then(() =>
          cardContainer.classList.toggle("cards-flipped")
        );
      }
    }
  };
  const cards = gameData.map((pokemonData) => (
    <Card
      onClick={cardClick}
      key={pokemonData.id}
      id={pokemonData.id}
      title={pokemonData.name}
      image={pokemonData.sprite}
    ></Card>
  ));
  // This effect fetches the pokemon data and starts the game main loop
  useEffect(() => {
    async function fetchData() {
      if (gameState === "loading") {
        const randomIDs = [];
        const count = await getPokemonCount();
        console.log();
        while (randomIDs.length !== fetchCounts[gameDifficulty]) {
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
    return (
      <>
        <StartMenu onRadioChange={((option)=> setGameDifficulty(option))} onStart={()=> setGameState('loading')}></StartMenu>
      </>
    );
  } else if (gameState === "loading") {
    return <LoadingScreen></LoadingScreen>;
  } else if (
    gameState === "main_loop" ||
    gameState === "game_won" ||
    gameState === "game_lost"
  ) {
    return (
      <>
        {gameState === "game_won" || gameState === "game_lost" ? (
          <GameOverModal
            winOrLose={gameState === "game_won" ? "WIN" : "LOSE"}
            finalScore={currentScore}
            difficulty={gameDifficulty}
            setDifficulty={setGameDifficulty}
            onButtonClick={() => {
              setGameState("loading");
              setCurrentScore(0);
            }}
          >
            {" "}
          </GameOverModal>
        ) : (
          ""
        )}
        <ScoreBoard
          currentScore={currentScore}
          bestScore={bestScore.current}
        ></ScoreBoard>
        <CardContainer
          onCardClick={cardClick}
          gameData={gameData}
          gameState={gameState}
        >
          {cards}
        </CardContainer>
      </>
    );
  }
}
