import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import rootReducer from '../reducer';
import pokemonsReducer from '../reducer/pokemonsReducer'
import thunk from 'redux-thunk';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   combineReducers({root: rootReducer, pokemons: pokemonsReducer}),
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;