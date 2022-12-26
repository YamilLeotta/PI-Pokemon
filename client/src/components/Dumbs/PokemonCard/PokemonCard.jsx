import React from "react";
import Types from "../../Smarts/Types/Types";
import s from './pokemonCard.module.css';

export default class PokemonCard extends React.Component {
  render() {
    return (
      <div className={s.card}>
        <h3>{this.props.name[0].toUpperCase() + this.props.name.substring(1)}</h3>
        <img src={this.props.image} alt={this.props.name[0].toUpperCase() + this.props.name.substring(1)} />
        <Types types={this.props.types.map(name => ({name}))} actives={this.props.types.map(name => ({name}))} />
      </div>
    );
  }
}
