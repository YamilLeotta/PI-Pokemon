import React from "react";
//import './App.css';
import {Route, Switch} from 'react-router-dom';
import Nav from './components/Dumbs/Nav/Nav';
import Home from './components/Smarts/Home/Home';
import Landing from './components/Dumbs/Landing/Landing';
import PokemonDetails from './components/Dumbs/PokemonDetails/PokemonDetails';
import CreatePokemon from './components/Smarts/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div style={{height: '100%'}}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Nav />
      </Switch>
      <Switch>
        <Route path="/pokemon/create">
          <CreatePokemon />
        </Route>
        <Route path="/pokemon/:name">
          <PokemonDetails />
        </Route>
        <Route path="/home">
          <Home pokemons={[1,2,3,4,5,6]} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;