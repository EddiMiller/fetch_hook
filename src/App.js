import React, { useState, useEffect, Fragment, useCallback } from 'react';
import './App.css';
import { fetchData } from './Api/Api';
import { getRandomNumber, capitalize } from './Helper/Ulitity';
import Abilities from './Helper/Abilities';
import './main.scss';

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
      <section class="poke-card">
        <h1>{pokemon.name}</h1>
        <div class="poke-card_container">
          <div class="poke-card_container_left">
            <img class="poke-card_container_left_image" src={pokemon.img} alt={pokemon.name}/>
          </div>
          <div class="poke-card_container_right">
            <h2>Fähigkeiten</h2>
            {abilities.map((ability, index) => {
              return (
                <div class="text poke-card_container_right_abillity" key={index}>
                  <h3>{ability.name}</h3>
                  <p>{ability.short_effect}</p>
                </div>
              )
            })}
          </div>
        </div>
        <button class="btn-basic" onClick={() => {onClickHandler()}}>new Pokemon</button>
      </section>
    </Fragment>
  );
}

export default App;
