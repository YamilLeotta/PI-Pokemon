import React, { Component } from "react";

export default class PokemonDetails extends Component {
  render() {
    return (
      <div>
        <h1>Pokemon Details</h1>
      </div>
    );
  }
}

/*
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import * as actions from '../../redux/actions';
import {useParams} from "react-router-dom";
// Importar las actions como Object Modules, sino los test no funcionarán!

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen (lease tambien lo de react-redux).
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.
// TIP: Aqui seria un buen momento para utilizar el hook useSelector.

const CharacterDetail = (props) => {
  const dispatch = useDispatch;
  const characterDetail = useSelector(state => state.characterDetail);
  const {id} = useParams();

  React.useEffect(() => {dispatch(actions.getCharacterDetail(id))}, [characterDetail]);

  return (
    <div>
      <img src={characterDetail.image} alt={characterDetail.name} />
      <h2>{characterDetail.name}</h2>
      <h3>{characterDetail.faction}</h3>
      <h3>{characterDetail.role}</h3>
      <h3>{characterDetail.race}</h3>
      <br/>
      <h2>Ship: </h2>
      <h3>{characterDetail.ship.name}</h3>
      <img src={characterDetail.ship.image} alt={characterDetail.ship.name} />
    </div>
  );
};


export default CharacterDetail;
*/