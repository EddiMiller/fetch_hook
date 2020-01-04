import { fetchData } from '../Api/Api';
import { capitalize } from './Ulitity';

const Abilities = () => {
  const getAbility = async abilityUrl => {
    const data = await fetchData(abilityUrl);
    const newAbility = { name: capitalize(data.name), short_effect: data.effect_entries[0].short_effect, long_effect: data.effect_entries[0].effect }
    return newAbility;
  }

  const fetchAbilities = async (pokemon, callback) => {
    const promises = pokemon.abilities.map(element => {
      return getAbility(element.ability.url);
    });
    const newAbilities = await Promise.all(promises);
    callback(newAbilities);
  };

  return {
    fetch: fetchAbilities
  }
}

export default Abilities();