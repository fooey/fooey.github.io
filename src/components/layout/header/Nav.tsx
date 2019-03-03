import React from 'react';

import './Nav.scss';

const Nav: React.FunctionComponent = () => (
  <nav className="-layout-header-nav">
    <ul>
      <li><a href="#">OVERVIEW</a></li>
      <li><a href="#">CONTACT</a></li>
      <li><a href="#">PROJECTS</a></li>
      <li><a href="#">KNOWLEDGE</a></li>
      <li><a href="#">RÉSUMÉ</a></li>
    </ul>
  </nav>
);

export default Nav;
