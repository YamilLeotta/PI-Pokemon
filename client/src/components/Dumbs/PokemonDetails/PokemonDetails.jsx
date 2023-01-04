import React from "react";
import {connect} from "react-redux";
import {getPokemonDetail, setLoading} from "../../../redux/actions";
import {capitalize} from "../../../utils";
import Types from "../../Smarts/Types/Types";
import s from './pokemonDetails.module.css';

class PokemonDetails extends React.Component {
  componentDidMount() {
    try{
      this.props.setLoading(true);
      this.props.getPokemonDetail(this.props.match.params.id).then(() => this.props.setLoading(false));
    }
    catch(err){
      console.log(err);
    }
  }

  render() {
    if (this.props.loading) return (<h3>Loading...</h3>);
    if (!this.props.pokemonDetail) return (<h3>Pokemon not found!</h3>);

    return (
      <div style={{width: '20%', margin:'auto', marginTop: '20px', padding: '20px', textAlign: 'center', backgroundColor: 'white',
      opacity: '95%', borderRadius: '30px'}}>
          <h1>{capitalize(this.props.pokemonDetail.name) + ` (${this.props.pokemonDetail.id})`}</h1>
          <img className={s.imgDetail} src={this.props.pokemonDetail.image} alt={capitalize(this.props.pokemonDetail.name)} />
          <Types types={this.props.pokemonDetail.types.map(name => ({name}))} actives={this.props.pokemonDetail.types.map(name => ({name}))} />
          <table className={s.tableSpecs}>
            <tbody>
              <tr><td className={s.tdDetail}>Height:</td><td className={s.tdValue}>{this.props.pokemonDetail.height}</td></tr>
              <tr><td className={s.tdDetail}>Weight:</td><td className={s.tdValue}>{this.props.pokemonDetail.weight}</td></tr>
              <tr><td className={s.tdDetail}>HP:</td><td className={s.tdValue}>{this.props.pokemonDetail.hp}</td></tr>
              <tr><td className={s.tdDetail}>Attack:</td><td className={s.tdValue}>{this.props.pokemonDetail.attack}</td></tr>
              <tr><td className={s.tdDetail}>Defense:</td><td className={s.tdValue}>{this.props.pokemonDetail.defense}</td></tr>
              <tr><td className={s.tdDetail}>Speed:</td><td className={s.tdValue}>{this.props.pokemonDetail.speed}</td></tr>
            </tbody>
          </table>
      </div>
      );
  }
}

export default connect(({pokemonDetail, types, loading}) => ({pokemonDetail, types, loading}), {getPokemonDetail, setLoading})(PokemonDetails);