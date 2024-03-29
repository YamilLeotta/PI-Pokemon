import React from "react";
//import s from './home.module.css';
import PokemonCards from "../PokemonCards/PokemonCards";
import ApiRegsOrderFilter from "../ApiRegsOrderFilter/ApiRegsOrderFilter";
import {connect} from 'react-redux';
import {getTypes, setTypesFilter} from "../../../redux/actions";

class Home extends React.Component {
  componentDidMount(){
    if (!this.props.types || !this.props.typesFilter) this.props.getTypes().then(results => this.props.setTypesFilter(results.payload));
  }

  handleFilterChange = typesSelected => {
    this.props.setTypesFilter(typesSelected);
    return true;
  }
  
  render() {
    if (!this.props.types || !this.props.typesFilter) return (<div><h2>Loading types...</h2></div>)
    
    let pokemonsFiltered = [];
    if (this.props.pokemons?.own && this.props.ownRegs) pokemonsFiltered.push(...this.props.pokemons.own)  // Pokemons DB
    if (this.props.pokemons?.api && this.props.apiRegs) pokemonsFiltered.push(...this.props.pokemons.api.slice(0, this.props.apiRegs))  // Pokemons Api

    pokemonsFiltered = pokemonsFiltered.filter(({types}) => types.some(type => this.props.typesFilter.some(({name}) => name === type)));

    return (
      <div className="container">
        <ApiRegsOrderFilter apiRegs={this.props.apiRegs} ownRegs={this.props.ownRegs} apiPokemons={(this.props.pokemons?.api || []).length} // Para apiRegsOrderFilter
          onFilterChange={this.handleFilterChange} types={this.props.types} typesFilter={this.props.typesFilter} // Para Types
        />
        {this.props.loading ?
          <div style={{display: 'inline-block'}}><h2>Loading pokemons...</h2></div>
          : (pokemonsFiltered.length ?
            <PokemonCards pokemonsFiltered={pokemonsFiltered} />
            : <div style={{display: 'inline-block'}}><h2>No pokemons to list!</h2></div>)}
      </div>
    );
  }
}

export default connect(({pokemons, root}) => ({pokemons: pokemons.pokemons, typesFilter: root.typesFilter, types: root.types, apiRegs: root.apiRegs, ownRegs: root.ownRegs, loading: root.loading}), {getTypes, setTypesFilter})(Home);