import React from "react";
import s from './types.module.css';

export default class Types extends React.Component {
  constructor (props){
    super(props);
    this.state = {activeTypes: props.actives}; //activeTypes: [{id, name}, {id, name}, {id, name}]
  }

  componentDidMount(){
    if (!this.state.activeTypes) this.setState(old => ({...old, activeTypes: this.props.actives}));
  }

  handleClick = event => {
    let activeTypes = this.state.activeTypes?.some(({name}) => name === event.target.name) ?
    this.state.activeTypes?.filter(({name}) => name !== event.target.name)
    : [...this.state.activeTypes, this.props.types?.find(({name}) => name === event.target.name)];

    if (this.props.onChange(activeTypes))
      this.setState(old => ({...old, activeTypes}));
  }

  render() {
    return (
      <div className={s.container}>
          {this.props.types.map(({name}) => (<img key={name} className={this.state.activeTypes.some(el => el.name === name) ? this.props.onChange ? `${s.icon} ${s.iconActive}` : s.iconReadOnly : s.icon} src={`../images/types/${name}.gif`} alt={name} title={name.toUpperCase()} name={name} onClick={this.props.onChange && this.handleClick} />))}
        </div>
    );
  }
}