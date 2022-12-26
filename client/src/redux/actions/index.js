let nextId = 1;

//Actions
export const setTypesFilter = payload => ({type: 'SET_TYPES_FILTER', payload});
export const setOrder = payload => ({type: 'SET_ORDER', payload});
export const setIpp = payload => ({type: 'SET_IPP', payload});
export const setApiRegs = payload => ({type: 'SET_API_REGS', payload});
export const setOwnRegs = payload => ({type: 'SET_OWN_REGS', payload});
export const setLoading = payload => ({type: 'SET_LOADING', payload});

//Thunks
export const getOwnPokemons = () =>
    dispatch => {fetch(`http://localhost:3001/pokemons?only=own`)
        .then(resp => resp.json())
        .then(payload => dispatch({type: 'GET_OWN_POKEMONS', payload}))
        .catch(console.log)};

export const getApiPokemons = apiRegs =>
    dispatch => fetch(`http://localhost:3001/pokemons?only=api&apiRegs=${apiRegs}`)
        .then(resp => resp.json())
        .then(payload => dispatch({type: 'GET_API_POKEMONS', payload}))
        .catch(console.log);
    
export const getTypes = () =>
    dispatch => fetch(`http://localhost:3001/types`)
        .then(resp => resp.json())
        .then(payload => dispatch({type: 'GET_TYPES', payload}))
        .catch(console.log);

export const createPokemon = data =>
    dispatch => {fetch(`http://localhost:3001/pokemons`, {
        method: 'POST',
        body: JSON.stringify({...data, id: nextId++}),
        headers:{'Content-Type': 'application/json'}
        })
        .then(resp => resp.json())
        .then(payload => dispatch({type: 'CREATE_POKEMON', payload}))
        .catch(console.log)};

// Depende como debo trabajar con el detalle, si es por estado global:
export const getPokemonDetail = id =>
    dispatch => {fetch(`http://localhost:3001/pokemons/${id}`)
        .then(resp => resp.json())
        .then(payload => dispatch({type: 'GET_POKEMON_DETAIL', payload}))
        .catch(console.log)};
