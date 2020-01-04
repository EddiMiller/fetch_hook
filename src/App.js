import React, { useState, useEffect, Fragment, useCallback } from 'react';
import './App.css';
import { fetchData } from './Api/Api';
import { getRandomNumber, capitalize } from './Helper/Ulitity';
import Abilities from './Helper/Abilities';

const POKEAPI = 'https://pokeapi.co/api/v2/';

const App = () => {

  const [pokemon, setPokemon] = useState({ name: undefined, img: undefined });
  const [abilities, setAbilities] = useState([]);

  const collectPokemon = useCallback(async () => {
    const data = await fetchData(`${POKEAPI}pokemon/${getRandomNumber()}`);
    const newPokemon = { name: capitalize(data.name), img: data.sprites.front_default, abilities: data.abilities }
    Abilities.fetch(newPokemon, newAbilities => setAbilities(newAbilities));
    setPokemon(newPokemon);
  }, [])

  useEffect(() => {
    collectPokemon()
  }, [collectPokemon])

  const onClickHandler = () => {
    collectPokemon();
  }

  return (
    <Fragment>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.img} alt={pokemon.name}/>
      <h2>Fähigkeiten</h2>
      {abilities.map((ability, index) => {
        return (
          <div key={index}>
            <h3>{ability.name}</h3>
            <p>{ability.short_effect}</p>
          </div>
        )
      })}
      <button onClick={() => {onClickHandler()}}>new Pokemon</button>
    </Fragment>
  );
}

export default App;
