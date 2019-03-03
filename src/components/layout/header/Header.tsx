import React, { useState } from 'react';
import classnames from 'classnames';

import Logo from './Logo';
import Nav from './Nav';

import './Header.scss';

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function toggleMenu() {
    const newValue = !isMenuVisible;
		console.log('TCL: toggleMenu -> newValue', newValue)
    setIsMenuVisible(newValue);

    return newValue;
  }

  const headerClass = classnames({
    '-layout-header': true,
    'show-nav': isMenuVisible,
  });

  return (
    <header className={headerClass}>
      <Logo toggleMenu={toggleMenu} isMenuVisible={isMenuVisible} />
      <Nav />
    </header>
  );
};

export default Header;
