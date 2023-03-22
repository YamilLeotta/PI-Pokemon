import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonDetail, setLoading} from "../../../redux/actions";
import {capitalize} from "../../../utils";
import Types from "../../Smarts/Types/Types";
import s from './pokemonDetails.module.css';
import pokebola from '../../../images/pokebola.png'
import { useEffect } from "react";
import {useParams} from 'react-router-dom';

export default function PokemonDetails(props){
  const {id} = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector(state => state.pokemons.pokemonDetail);
  const loading = useSelector(state => state.root.loading);

  useEffect(() => {
    //console.log('entra al use effect');
    dispatch(setLoading(true));
    dispatch(getPokemonDetail(id)).then(() => dispatch(setLoading(false)));
  }, [id, dispatch]);

  if (loading) return (<h3>Loading...</h3>);
  if (!pokemonDetail) return (<h3>Pokemon not found!</h3>);

  if (pokemonDetail.id[0] && !pokemonDetail.image) pokemonDetail.image = pokebola;

  return (
    <div className="container" style={{paddingTop: '20px'}}>
      <div className="tableContainer">
        <h1>{capitalize(pokemonDetail.name) + ` (${pokemonDetail.id})`}</h1>
        <img className={s.imgDetail} src={pokemonDetail.image + (!pokemonDetail.id[0] ? `/shiny/${pokemonDetail.id}.png` : '')} alt={capitalize(pokemonDetail.name)} />
        {!pokemonDetail.id[0] && (<img className={`${s.imgDetail} ${s.shiny}`} src={pokemonDetail.image + (!pokemonDetail.id[0] ? `/${pokemonDetail.id}.png` : '')} alt={capitalize(pokemonDetail.name)} />)}
        <Types types={pokemonDetail.types.map(name => ({name}))} actives={pokemonDetail.types.map(name => ({name}))} />
        <table className={s.tableSpecs}>
          <tbody>
            <tr><td className={s.tdDetail}>Height:</td><td className={s.tdValue}>{pokemonDetail.height}</td></tr>
            <tr><td className={s.tdDetail}>Weight:</td><td className={s.tdValue}>{pokemonDetail.weight}</td></tr>
            <tr><td className={s.tdDetail}>HP:</td><td className={s.tdValue}>{pokemonDetail.hp}</td></tr>
            <tr><td className={s.tdDetail}>Attack:</td><td className={s.tdValue}>{pokemonDetail.attack}</td></tr>
            <tr><td className={s.tdDetail}>Defense:</td><td className={s.tdValue}>{pokemonDetail.defense}</td></tr>
            <tr><td className={s.tdDetail}>Speed:</td><td className={s.tdValue}>{pokemonDetail.speed}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    );
}


/*

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

    if (this.props.pokemonDetail.id[0] && !this.props.pokemonDetail.image) this.props.pokemonDetail.image = pokebola;

    return (
      <div className="container" style={{paddingTop: '20px'}}>
        <div className="tableContainer">
          <h1>{capitalize(this.props.pokemonDetail.name) + ` (${this.props.pokemonDetail.id})`}</h1>
          <img className={s.imgDetail} src={this.props.pokemonDetail.image + (!this.props.pokemonDetail.id[0] ? `/shiny/${this.props.pokemonDetail.id}.png` : '')} alt={capitalize(this.props.pokemonDetail.name)} />
          {!this.props.pokemonDetail.id[0] && (<img className={`${s.imgDetail} ${s.shiny}`} src={this.props.pokemonDetail.image + (!this.props.pokemonDetail.id[0] ? `/${this.props.pokemonDetail.id}.png` : '')} alt={capitalize(this.props.pokemonDetail.name)} />)}
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
      </div>
      );
  }
}

export default connect(({pokemonDetail, types, loading}) => ({pokemonDetail, types, loading}), {getPokemonDetail, setLoading})(PokemonDetails);

*/