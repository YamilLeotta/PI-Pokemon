//import * as aT from "../actions";

const initialState = {
  pokemons: null, // {own: [{}, {}], api: [{}, {}]}
  types: null, // [{idDB, name}, {idDB, name}, {idDB, name}]
  typesFilter: null, // [{idDB, name}, {idDB, name}, {idDB, name}]
  order: null,
  ipp: 12,
  apiRegs: 40, // 0 if apiRegs disabled
  ownRegs: true,
  loading: false
//  pokemonDetail: null, En el caso de que traiga el detalle del pokemon al estado global
};

const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_API_POKEMONS': console.log('apiPokemons:', state.pokemons?.api, '->', payload); return {...state, pokemons: {...state.pokemons, api: payload}};
    case 'SET_LOADING': return {...state, loading: payload};
    case 'GET_OWN_POKEMONS': console.log('ownPokemons:', state.pokemons?.own, '->', payload); return {...state, pokemons: {...state.pokemons, own: payload}};
    case 'GET_TYPES': console.log('types:', state.types, '->', payload); return {...state, types: payload};
    case 'SET_TYPES_FILTER': console.log('typesFilter:', state.typesFilter, '->', payload); return {...state, typesFilter: payload};
    case 'SET_ORDER': console.log('order:', state.order, '->', payload); return {...state, order: payload};
    case 'SET_IPP': return {...state, ipp: payload};
    case 'SET_API_REGS': console.log('apiRegs:', state.apiRegs, '->', payload); return {...state, apiRegs: payload};
    case 'SET_OWN_REGS': console.log('ownRegs:', state.ownRegs, '->', payload); return {...state, ownRegs: payload};
//    case 'GET_POKEMON_DETAIL': return {...state, pokemonDetail: payload}; // En el caso de que traiga el detalle del pokemon al estado global
    case 'CREATE_POKEMON': return {...state, pokemons: [...state.pokemons, payload]};
    default: return {...state};
  }
};

export default rootReducer;
