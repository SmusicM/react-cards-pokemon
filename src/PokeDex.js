import React, { useEffect, useState } from "react";
import {v1 as uuid} from "uuid";

import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, setPokemon] = useState([]);
  const [url,setUrl] = useState(null)
  const {response} = useAxios(url);
    useEffect(()=>{
      if(response){
        setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
      }
    },[response])
      
 
    const addPokemon = async name => {
      setUrl(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  };
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites.front_default}
            back={cardData.sprites.back_default}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
