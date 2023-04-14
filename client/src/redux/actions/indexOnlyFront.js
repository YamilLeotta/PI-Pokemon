import types from '../../utils/types.json';
import pokemons from '../../utils/pokemons.json';

if (!localStorage.getItem("ownPokemons") && (!process.env.REACT_APP_BACK_URL))
    localStorage.setItem("ownPokemons", JSON.stringify([{
        id: "C1", name: "yamil", height: "16", weight: "480",
        hp: "74", attack: "115", defense: "70", speed: "135", types: ["fairy", "flying"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/195.svg"
    }]))

//Actions
export const setTypesFilter = payload => ({type: 'SET_TYPES_FILTER', payload});
export const setOrder = payload => ({type: 'SET_ORDER', payload});
export const setIpp = payload => ({type: 'SET_IPP', payload});
export const setApiRegs = payload => ({type: 'SET_API_REGS', payload});
export const setOwnRegs = payload => ({type: 'SET_OWN_REGS', payload});
export const setLoading = payload => ({type: 'SET_LOADING', payload});

//Thunks
export const getOwnPokemons = () => async dispatch => dispatch({type: 'GET_OWN_POKEMONS', payload: JSON.parse(localStorage.getItem("ownPokemons"))})

export const getApiPokemons = apiRegs => async dispatch => dispatch({type: 'GET_API_POKEMONS', payload: pokemons.slice(0, apiRegs)})

export const getTypes = () => async dispatch => dispatch({type: 'GET_TYPES', payload: types})

export const createPokemon = ({defaults, types}) => async dispatch => {
    localStorage.setItem("ownPokemons", JSON.stringify(JSON.parse(localStorage.getItem("ownPokemons")).concat({id: `C${JSON.parse(localStorage.getItem("ownPokemons")).length + 1}`, ...defaults, types: types.map(({name}) => name)})));
    return dispatch({type: 'CREATE_POKEMON', payload: {id: `C${JSON.parse(localStorage.getItem("ownPokemons")).length + 1}`, ...defaults, types: types.map(({name}) => name)}})
}

// eslint-disable-next-line
export const getPokemonDetail = pokeId => async dispatch => dispatch({type: 'GET_POKEMON_DETAIL', payload: pokemons.concat(JSON.parse(localStorage.getItem("ownPokemons"))).filter(({id}) => id == pokeId)[0]})