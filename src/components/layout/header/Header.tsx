import React, { useState } from 'react';
import classnames from 'classnames';

import Logo from './Logo';
import Nav from './Nav';

import './Header.scss';

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function toggleMenu() {
    setIsMenuVisible(!isMenuVisible);
  }

  function closeMenu() {
    setIsMenuVisible(false);
  }

  const headerClass = classnames({
    '-layout-header': true,
    'show-nav': isMenuVisible,
  });

  return (
    <header className={headerClass}>
      <Logo toggleMenu={toggleMenu} isMenuVisible={isMenuVisible} />
      <Nav closeMenu={closeMenu} />
    </header>
  );
};

export default Header;
