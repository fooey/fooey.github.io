import React from 'react';
import { NavLink } from "react-router-dom";

interface IMyNavLinkProps {
  children: React.ReactNode;
  to: string;
  closeMenu: () => any;
}

const CustomNavLink = ({ closeMenu, to, children }: IMyNavLinkProps) => (
  <li><NavLink onClick={() => closeMenu()} exact activeClassName="selected" to={to}>{children}</NavLink></li>
);

export default CustomNavLink;
