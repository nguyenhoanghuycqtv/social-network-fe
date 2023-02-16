import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>USERS</NavLink>
    </li>
    <li>
      <NavLink to="/u1/posts">ME</NavLink>
    </li>
    <li>
      <NavLink to="/posts/new">ADD</NavLink>
    </li>
    {/* <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li> */}
  </ul>
};

export default NavLinks;