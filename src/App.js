import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState({})
  const [yourPokemons, setYourPokemons] = useState([])

  useEffect(() => {
    getPokemon()
  }, [])

  const getRandomPokemonId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getPokemon = () => {
    axios
    .get('https://pokeapi.co/api/v2/pokemon/' + getRandomPokemonId())
    .then(response => {
      setPokemon(response.data);
    })
  }

  const catchPokemon = (pokemon) => {
    const newSelectedPokemon = [...yourPokemons, pokemon]
    setYourPokemons(newSelectedPokemon)
    getPokemon()
  }

  return (
    <div className="App">
      <section className="pokemon">
          <h2>Pokemon</h2>
          <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
          <h3>{pokemon.name}</h3>
          <button className="catch-btn" onClick={() => catchPokemon(pokemon)}>CATCH</button>
        </section>

        <section className="your-poke">
          <h2>Your pokemon</h2>
          <div className="poke-list">
            {yourPokemons.map(pokemon => (
              <div className="poke" key={pokemon.id}>
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
                <h3>{pokemon.name}</h3>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}

export default App;
