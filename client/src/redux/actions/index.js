import * as actionsOnlyFront from './indexOnlyFront';
import * as actionsWithBack from './indexWithBack';

export const {
    setTypesFilter,
    setOrder,
    setIpp,
    setApiRegs,
    setOwnRegs,
    setLoading,
    getOwnPokemons,
    getApiPokemons,
    getTypes,
    createPokemon,
    getPokemonDetail
} = (process.env.REACT_APP_BACK_URL) ? actionsWithBack : actionsOnlyFront;
