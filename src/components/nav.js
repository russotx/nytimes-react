import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Nav extends Component {

  render() {
    return(
      <nav>
        <ul className='nav'>
          <li>
            <NavLink exact activeClassName= 'active-nav' to='/'>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-nav' to='/results'>
              Results
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-nav' to='/saved'>
              Saved
            </NavLink> 
          </li>
        </ul>
      </nav>
    )
  }


}


export default Nav;