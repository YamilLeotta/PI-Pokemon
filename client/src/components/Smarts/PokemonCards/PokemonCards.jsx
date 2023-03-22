import React from "react";
import s from './pokemonCards.module.css';
import PokemonCard from "../../Dumbs/PokemonCard/PokemonCard";
import Paging from "../Paging/Paging";
import {connect} from "react-redux";
import {setIpp} from "../../../redux/actions";
import {orderBy} from '../../../utils';

class PokemonCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: 1};
  }

  handlePageChange = page => {
    this.setState(old => ({...old, page}));
  }

  render() {
    return (
      <div>
        <Paging pokemonsCount={this.props.pokemonsFiltered.length} page={this.state.page} ipp={this.props.ipp} onPageChange={this.handlePageChange} setIpp={this.props.setIpp} />
        <div className={s.container}>
          {
            orderBy(this.props.pokemonsFiltered, this.props.order).slice(this.state.page * this.props.ipp - this.props.ipp, this.state.page * this.props.ipp).map((pokemon, index) => <PokemonCard {...pokemon} key={pokemon.id} />)
          }
        </div>
      </div>
    );
  }
}

export default connect(({root}) => ({order: root.order, ipp: root.ipp}), {setIpp})(PokemonCards);