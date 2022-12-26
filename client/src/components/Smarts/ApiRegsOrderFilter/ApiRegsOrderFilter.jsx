import React from "react";
import {connect} from "react-redux";
import Types from "../Types/Types";
import s from './apiRegsOrderFilter.module.css';
import {setOrder, setApiRegs, setOwnRegs, getApiPokemons, getOwnPokemons, setLoading} from "../../../redux/actions";

class ApiRegsOrderFilter extends React.Component {
  constructor(props){
    super(props);
    let orderSliced = this.sliceOrder(this.props.order);

    this.state = {
      orderBy: orderSliced[0],
      order: orderSliced[1]
    }
  }

  componentDidMount(){
    console.log('Component did Mount', this.props.pokemons);
    if (!this.props.pokemons){
      console.log('Getting Pokemons');
      if (this.props.apiRegs) this.props.getApiPokemons(this.props.apiRegs);
      if (this.props.ownRegs) this.props.getOwnPokemons();
    }

  }

  handleRegs = event => { 
    switch (event.target.name){
      case 'apiRegs': {
        if (event.target.value >= 0) this.props.setApiRegs(event.target.value);
        console.log('defino si bajar mas pokemons', this.props.apiPokemons, event.target.value);
        if (this.props.apiPokemons < event.target.value) {
          this.props.setLoading(true);
          this.props.getApiPokemons(event.target.value).then(() => this.props.setLoading(false));
        }
        break;
      }
      case 'api': this.props.setApiRegs(event.target.checked ? this.props.apiPokemons || 40 : 0); break;
      case 'own': this.props.setOwnRegs(event.target.checked); break;
      default:
    }
  }

  sliceOrder = orderChain => orderChain ? [orderChain.substring(0, orderChain.length - 1), orderChain[orderChain.length - 1]] : ['', 'A'];

  handleOrder = event => {
    this.setState(old => ({...old, [event.target.name]: event.target.value}), () => this.props.setOrder((this.state.orderBy !== '') ? this.state.orderBy + this.state.order : null));
  }

  render() {
    return <div className={s.rightBar}>
      
      <fieldset>
        <legend>Regs includes:</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" id="own" name="own" checked={this.props.ownRegs} onChange={this.handleRegs} />
                <label htmlFor="own">Own DB</label>
              </td>
              <td>
                <input type="checkbox" id="api" name="api" checked={this.props.apiRegs > 0} onChange={this.handleRegs} />
                <label htmlFor="api">Api</label>
              </td>
            </tr>
            <tr style={!this.props.apiRegs ? {display: 'none'} : {display: 'table-row'}}>
              <td colSpan={2}>
                <h6 style={{display: 'inline-block', margin: '10px'}}>Api Pokemons:</h6>
                <input type="number" value={this.props.apiRegs} style={{width: 70, marginRight: '5px'}} name="apiRegs" onChange={this.handleRegs}/> 
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <fieldset>
        <legend>Order:</legend>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <h6 style={{display: 'inline-block', margin: '10px'}}>Order by:</h6>
                <select name="orderBy" value={this.state.orderBy} onChange={this.handleOrder}>
                  <option value="">None</option>
                  <option value="name">Name</option>
                  <option value="weight">Weight</option>
                  <option value="attack">Attack</option>
                </select>
              </td>
            </tr>
            <tr style={this.state.orderBy === '' ? {display: 'none'} : {display: 'table-row'}}>
              <td>
                <input type="radio" value="A" id="asce" name="order" checked={this.state.order === 'A'} onChange={this.handleOrder} />
                <label htmlFor="asce">Ascending</label>
              </td>
              <td>
                <input type="radio" value="D" id="desc" name="order" checked={this.state.order === 'D'} onChange={this.handleOrder} />
                <label htmlFor="desc">Descending</label>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <fieldset>
        <legend>Type Filter:</legend>
        <Types onChange={this.props.onFilterChange} types={this.props.types} actives={this.props.typesFilter} />
      </fieldset>
    </div>;
  }
}

export default connect(({order}) => ({order}), {setOrder, setApiRegs, setOwnRegs, getApiPokemons, getOwnPokemons, setLoading})(ApiRegsOrderFilter);