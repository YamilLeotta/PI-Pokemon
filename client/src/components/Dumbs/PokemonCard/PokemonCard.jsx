import React from "react";
import Types from "../../Smarts/Types/Types";
import s from './pokemonCard.module.css';
import {Link} from "react-router-dom";
import {capitalize} from "../../../utils";

export default class PokemonCard extends React.Component {
  render() {
    return (
      <Link className={s.card} to={`/pokemon/${this.props.id}`}>
          <h3>{capitalize(this.props.name)}</h3>
          <img src={this.props.image} alt={capitalize(this.props.name)} />
          <Types types={this.props.types.map(name => ({name}))} actives={this.props.types.map(name => ({name}))} />
      </Link>
    );
  }
}
