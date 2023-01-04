import React from "react";
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Nav from './components/Dumbs/Nav/Nav';
import Home from './components/Smarts/Home/Home';
import Landing from './components/Dumbs/Landing/Landing';
import PokemonDetails from './components/Dumbs/PokemonDetails/PokemonDetails';
import CreatePokemon from './components/Smarts/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className={"app"}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Nav />
      </Switch>
      <Switch>
        <Route path="/pokemon/create">
          <CreatePokemon />
        </Route>
        <Route path="/pokemon/:id" component={PokemonDetails} />
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;