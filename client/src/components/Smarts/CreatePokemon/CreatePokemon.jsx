import React from "react";
import Types from "../Types/Types";
import {getTypes, createPokemon} from "../../../redux/actions";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

class CreatePokemon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      defaults: {
        name: '',
        image: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: ''
      },
      types: [],
      completed: false,
      error: {
        name: true,
        image: false,
        height: true,
        weight: true,
        hp: true,
        attack: true,
        defense: true,
        speed: true
      }
    };
  }

  componentDidMount(){
    if (!this.props.types) this.props.getTypes();
  }

  handleSubmit = event => {
    event.preventDefault();

    let {defaults} = {...this.state};
    if (!defaults.image) defaults.image = null;

    this.props.createPokemon({defaults, types: this.state.types})
      .then(() => alert(`The Pokemon '${this.state.defaults.name}' has been created!`))
      .catch(() => alert(`Error ocurred. Posibily the pokemon ${this.state.defaults.name} already exists on DB.`))
      .then(() => this.setState({completed: true}))

    console.log(this.state);
  }

  handleOnChange = ({target}) => {
    let error = {...this.state.error};

    switch (target.name){
      case 'name': error.name = (target.value.length < 3 || target.value.length > 25 || !/^[a-zA-Z]+$/g.test(target.value)); break;
      case 'image': error.image = (target.value !== '' && !(/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(target.value))); break;
      case 'height': error.height = ((target.value === '') || (target.value < 0) || (target.value > 1000)); break;
      case 'weight': error.weight = ((target.value === '') || (target.value < 0) || (target.value > 10000)); break;
      case 'hp': error.hp = ((target.value === '') || (target.value < 0) || (target.value > 255)); break;
      case 'attack': error.attack = ((target.value === '') || (target.value < 0) || (target.value > 200)); break;
      case 'defense':
      case 'speed': error[target.name] = ((target.value === '') || (target.value < 0) || (target.value > 110)); break;
      default: break;
    }

    this.setState(old => ({...old, defaults: {...old.defaults, [target.name]: target.value}, error}));
  }

  handleTypes = types => {
    if (types.length > 2){
      alert('You can assign up to two types!');
      return false;
    }
    else{
      this.setState(old => ({...old, types}));
      return true;
    }
  }

  render() {
    if (this.state.completed) return <Redirect to="/home" />
    if (!this.props.types) return (<div><h2>Loading...</h2></div>)

    return (
      <div className="container" style={{paddingTop: '20px'}}>
        <form onSubmit={this.handleSubmit} className="tableContainer">
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="name">Name:</label></td>
                <td><input type="text" id="name" name="name" value={this.state.defaults.name} placeholder="Pokemon's Name..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.name ? 'red' : 'green'}}>Name must be between 3 and 25 characters Alpha string</td></tr>
              <tr>
                <td><label htmlFor="image">Image URL:</label></td>
                <td><input type="url" id="image" name="image" value={this.state.defaults.image} placeholder="Pokemon's Image URL..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.image ? 'red' : 'green'}}>URL must be an valid URL or empty</td></tr>
              <tr>
                <td><label htmlFor="height">Height:</label></td>
                <td><input type="number" id="height" name="height" value={this.state.defaults.height} placeholder="Pokemon's Height..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.height ? 'red' : 'green'}}>Height must be Number between 0 and 1000</td></tr>
              <tr>
                <td><label htmlFor="weight">Weight:</label></td>
                <td><input type="number" id="weight" name="weight" value={this.state.defaults.weight} placeholder="Pokemon's Weight..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.weight ? 'red' : 'green'}}>Weight must be Number between 0 and 10000</td></tr>
              <tr>
                <td><label htmlFor="hp">Hp:</label></td>
                <td><input type="number" id="hp" name="hp" value={this.state.defaults.hp} placeholder="Pokemon's Hp..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.hp ? 'red' : 'green'}}>Hp must be Number between 0 and 255</td></tr>
              <tr>
                <td><label htmlFor="attack">Attack:</label></td>
                <td><input type="number" id="attack" name="attack" value={this.state.defaults.attack} placeholder="Pokemon's Attack..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.attack ? 'red' : 'green'}}>Attack must be Number between 0 and 200</td></tr>
              <tr>
                <td><label htmlFor="defense">Defense:</label></td>
                <td><input type="number" id="defense" name="defense" value={this.state.defaults.defense} placeholder="Pokemon's Defense..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.defense ? 'red' : 'green'}}>Defense must be Number between 0 and 110</td></tr>
              <tr>
                <td><label htmlFor="speed">Speed:</label></td>
                <td><input type="number" id="speed" name="speed" value={this.state.defaults.speed} placeholder="Pokemon's Speed..." onChange={this.handleOnChange} /></td>
              </tr>
              <tr><td colSpan={2} style={{fontSize: 'smaller', paddingBottom: '20px', color: this.state.error.speed ? 'red' : 'green'}}>Speed must be Number between 0 and 110</td></tr>
            </tbody>
          </table>
          <fieldset>
            <legend>Types:</legend>
            <Types onChange={this.handleTypes} types={this.props.types.filter(({name}) => name !== 'unknown')} actives={this.state.types} />
          </fieldset>
          <input type="submit" value="Submit" disabled={Object.values(this.state.error).includes(true)}/>
        </form>
      </div>
    )
  }
}

export default connect(({root}) => ({types: root.types}), {getTypes, createPokemon})(CreatePokemon);