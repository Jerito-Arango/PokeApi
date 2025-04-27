import axios from 'axios';
import Pokemon from '../interfaces/Pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const getRandomPokemon = async (): Promise<Pokemon> => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await axios.get(`${API_URL}/${randomId}`);
    const { data } = response;
  
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
    };
  };