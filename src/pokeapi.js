const getPokemonCount = () => {
  fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1").then((response) => {
    return response.json().count;
  })
}