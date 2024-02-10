export {getRandomPokemon, getPokemonCount, getPokemonById};

const getRandomPokemon = async () => {
  const count_response = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1")
  const count_json =  await count_response.json()
  const id = Math.floor(Math.random()*parseInt(count_json.count)) + 1;
  const pokemon_response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return pokemon_response.json()
}

const getPokemonCount = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1");
  const json = await response.json();
  return json.count;
}

const getPokemonById = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const json = await response.json();
  return json;
}