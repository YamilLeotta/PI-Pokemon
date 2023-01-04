import React from "react";
import { connect } from "react-redux";
import {  Redirect } from "react-router-dom";
import { getPokemonDetail, setLoading } from "../../../redux/actions";

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {submitted: null, input: '', error: null};
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.setLoading(true);
    this.props.getPokemonDetail(this.state.input).then(() => this.props.setLoading(false));
    this.setState(old => ({submitted: old.input, input: ''}));
  }

  handleChange = ({target}) => {
    if ((target.value !== '') && (!/((^[a-zA-Z]+$)|(^[0-9]+$)|(^[cC][1-9][0-9]*$))/g.test(target.value)))
      this.setState(old => ({...old, error: 'Entire string | Entire number | "C123" styled string'}));
    else
      this.setState(old => ({...old, input: target.value, error: null}));
  }

  render() {
    return (
      <form style={{position: 'absolute', right: '1.5rem'}} onSubmit={this.handleSubmit}>
      {(this.state.submitted && <Redirect to={`/pokemon/${this.state.submitted}`} />)}
        <label visibility={this.state.error ? 'visible' : 'hidden'} style={{color: 'red'}}>{this.state.error}</label>
        <input
          type="text"
          placeholder="Search by Id or Name..."
          value={this.state.input}
          onChange={this.handleChange}
          style={{margin: '0 10px'}}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default connect(null, {getPokemonDetail, setLoading})(SearchBar);

/*
  export default function SearchBar({onSearch = alert}) {
    const [input, setInput] = useState('');

    function handleChange (e) {
      setInput(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      onSearch(input);
      setInput('');
    }

    return (
      <form style={{position: 'absolute', right: '1.5rem'}}onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={input}
          onChange={handleChange}
          style={{margin: '0 10px'}}
        />
        <Link style={{display: 'inline-block'}} to={`/pokemon/${input}`}>Search</Link>
      </form>
    );
  }
*/