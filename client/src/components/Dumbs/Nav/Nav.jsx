import React from "react";
import {NavLink} from "react-router-dom";
import SearchBar from "../../Smarts/SearchBar/SearchBar";
import s from './nav.module.css';

/*
export default function Nav() {
  //<Link to="/home">Home</Link>
  return (
    <div className={s.nav}>
      <NavLink className={s.navLink} activeClassName={s.navLinkActive} to="/home">Home</NavLink>
      <br />
      <NavLink className={s.navLink} activeClassName={s.navLinkActive} exact to="/pokemon/create">Create Pokemon</NavLink>
      <SearchBar />
    </div>
  );
}
*/

export default class Nav extends React.Component {
  render() {
    return (
      <div className={s.nav}>
        <NavLink className={s.navLink} activeClassName={s.navLinkActive} to="/home">Home</NavLink>
        <br />
        <NavLink className={s.navLink} activeClassName={s.navLinkActive} exact to="/pokemon/create">Create Pokemon</NavLink>
        <SearchBar />
      </div>
    );
  }
}
