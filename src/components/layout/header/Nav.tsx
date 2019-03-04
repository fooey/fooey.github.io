import React from 'react';
import NavLink from './NavLink';

import './Nav.scss';

interface INavProps {
  closeMenu: () => any;
}

const Nav = ({ closeMenu }: INavProps) => (
  <nav className="-layout-header-nav">
    <ul>
      <NavLink closeMenu={closeMenu} to="/">OVERVIEW</NavLink>
      <NavLink closeMenu={closeMenu} to="/contact">CONTACT</NavLink>
      <NavLink closeMenu={closeMenu} to="/projects">PROJECTS</NavLink>
      <NavLink closeMenu={closeMenu} to="/knowledge">KNOWLEDGE</NavLink>
      <NavLink closeMenu={closeMenu} to="/resume">RÉSUMÉ</NavLink>
    </ul>
  </nav>
);

export default Nav;
