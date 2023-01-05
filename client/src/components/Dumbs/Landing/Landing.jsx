import {Component} from "react";
import {NavLink} from "react-router-dom";
import s from "./Landing.module.css";

export default class Landing extends Component {
  render() {
    return (
      <div className={s.containerLanding}>
        <NavLink to="/home" className={s.button}>H O M E</NavLink>
      </div>
    );
  }
}