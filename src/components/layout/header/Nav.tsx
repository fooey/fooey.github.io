import React from 'react';
import { NavLink } from "react-router-dom";

import './Nav.scss';

interface INavProps {
  closeMenu: () => any;
}

const Nav = ({ closeMenu }: INavProps) => (
  <nav className="-layout-header-nav">
    <ul>
      <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to="/">OVERVIEW</NavLink></li>
      <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to="/contact">CONTACT</NavLink></li>
      <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to="/projects">PROJECTS</NavLink></li>
      <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to="/knowledge">KNOWLEDGE</NavLink></li>
      <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to="/resume">RÉSUMÉ</NavLink></li>
    </ul>
  </nav>
);

export default Nav;
