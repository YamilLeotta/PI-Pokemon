const initialState = {
  pokemons: null, // {own: [{}, {}], api: [{}, {}]}
  pokemonDetail: null
};

const pokemonsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_API_POKEMONS': return {...state, pokemons: {...state.pokemons, api: payload}};
    case 'GET_OWN_POKEMONS': return {...state, pokemons: {...state.pokemons, own: payload}};
    case 'GET_POKEMON_DETAIL': return {...state, pokemonDetail: payload};
    case 'CREATE_POKEMON': return {...state, pokemons: {...state.pokemons, own: [...state.pokemons?.own || [], payload]}};
    default: return {...state};
  }
};

export default pokemonsReducer;
