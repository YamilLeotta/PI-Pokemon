import React, { Component } from "react";

export default class CreatePokemon extends Component {
  render() {
    return (
      <div>
        <h1>Create Pokemon</h1>
      </div>
    );
  }
}
/*
import React from "react";
// Importar las actions como Object Modules, sino los test no funcionarán!
import * as acc from '../../redux/actions';
import {useDispatch} from "react-redux";

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen.
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.

const CreateCharacter = () => {
  let dispatch = useDispatch();
  const [input, setInput] = React.useState({
    name: "",
    race: "",
    role: "",
    faction: "",
    ship: {
      name: ""
    }
  });

  function handleChange(e){
      setInput({...input, [e.target.name]: e.target.value});
  }

  function handleChangeShip(e){
    setInput({...input, ship: {name: e.target.value}});
  }
  
  function handleSubmit(e){
    e.preventDefault();
    dispatch(acc.createCharacter(input));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Name: </label>
      <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)}/>
      <label>Race: </label>
      <input type="text" name="race" value={input.race} onChange={(e) => handleChange(e)} />
      <label>Faction: </label>
      <input type="text" name="faction" value={input.faction} onChange={(e) => handleChange(e)} />
      <label>Role: </label>
      <input type="text" name="role" value={input.role} onChange={(e) => handleChange(e)} />
      <label>Ship: </label>
      <input type="text" name="ship" value={input.ship.name} onChange={(e) => handleChangeShip(e)} />
      <button type="submit">Create Character</button>
    </form>
  );
};


export default CreateCharacter;
*/