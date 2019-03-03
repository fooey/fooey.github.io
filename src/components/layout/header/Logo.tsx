import React from 'react';
import classnames from 'classnames';

import './Logo.scss';

interface ILogoProps {
  isMenuVisible: boolean;
  toggleMenu: () => any;
}

const Logo = ({ toggleMenu, isMenuVisible }: ILogoProps) => {
  const headerClass = classnames({
    'hamburger': true,
    'hamburger--squeeze': true,
    'is-active': isMenuVisible,
  });
  console.log('TCL: Logo -> isMenuVisible', isMenuVisible)

  return (
    <div className="-layout-header-logo">
      <h1><a href="/">Jason Rushton</a></h1>
      <aside>
      <button 
        type="button" 
        className={headerClass} 
        onClick={() => toggleMenu()}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      </aside>
    </div>
  );
};

export default Logo;
