import React from "react";
import s from './paging.module.css';

export default class Paging extends React.Component {
    constructor(props){
        super(props);
        this.pageCount = 0;
    }
    
    componentDidUpdate(){
        if (this.props.page > this.pageCount)
            this.props.onPageChange(this.pageCount);
    }

    render() {
        this.pageCount = Math.ceil(this.props.pokemonsCount / this.props.ipp);

        return (
            <form className={s.paging}>
                <div style={{display: 'inline-block', marginRight: '40px', cursor: 'pointer'}}
                    onClick={() => {if (this.props.page > 1) this.props.onPageChange(this.props.page - 1)}}><h3>Prev</h3></div>

                <h6 style={{display: 'inline-block', marginRight: '30px'}}>({this.props.pokemonsCount} Pokemons)</h6>
                <h5 style={{display: 'inline-block', marginRight: '5px'}}>Page:</h5>

                <input type="number" value={this.props.page} style={{width: 35, marginRight: '5px'}} name="page" id="page"
                    onChange={({target}) => {if ((target.value >= 1) && (target.value <= this.pageCount)) this.props.onPageChange(- -target.value)}} /> 

                <h5 style={{display: 'inline-block', marginRight: '30px'}}>/ {this.pageCount}</h5>
                <h5 style={{display: 'inline-block', marginRight: '5px'}}>IPP:</h5>

                <input type="number" value={this.props.ipp} style={{width: 50, marginRight: '5px'}} name="ipp" id="ipp"
                    onChange={({target}) => {if (target.value > 0) {this.props.setIpp(target.value)}}} /> 

                <div onClick={() => {if (this.props.page < this.pageCount) this.props.onPageChange(this.props.page + 1)}} style={{display: 'inline-block', paddingLeft: '40px', cursor: 'pointer'}}><h3>Next</h3></div>
            </form>
        );
    }
}